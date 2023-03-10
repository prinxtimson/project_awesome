<?php

namespace App\Actions\Basecamp;

use App\Models\Basecamp as ModelsBasecamp;
use Exception;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\LazyCollection;

class Basecamp 
{

  protected $access_token;

  protected $refresh_token;

  protected $client_id;

  protected $client_secret;

  public function __construct()
  {
    $this->client_id = env('BASECAMP_CLIENT_ID');
    $this->client_secret = env('BASECAMP_CLIENT_SECRET');
    $this->access_token = config('app.basecamp_token');
    $this->refresh_token = env('BASECAMP_REFRESH_TOKEN');
    $this->getToken();
    $this->setRequestOptions();
  }

  public function getToken()
  {
    $auth = Http::withHeaders(['User-Agent'=> 'developertritek@gmail.com'])->withToken($this->access_token)->get('https://launchpad.37signals.com/authorization.json');
    
    if($auth->clientError()){
      $res = Http::post('https://launchpad.37signals.com/authorization/token?type=refresh&refresh_token='.$this->refresh_token.'&client_id='.$this->client_id.'&redirect_uri=your-redirect-uri&client_secret='.$this->client_secret)->json();
      
      $this->access_token = $res['access_token'];
      
      config(['app.basecamp_token' => $res['access_token']]);
    }
    
  }

      /**
     * Set options for making the Client request
     */
    private function setRequestOptions()
    {
        $authBearer = 'Bearer '. $this->access_token;
        
        $this->client = new Client(
            [
                'base_uri' => 'https://3.basecampapi.com/3950847',
                'verify' => false,
                'headers' => [
                    'Authorization' => $authBearer,
                    'Content-Type'  => 'application/json',
                    'Accept'        => 'application/json',
                    'User-Agent'    => 'developertritek@gmail.com'
                ]
            ]
        );
       
    }

        /**
     * @param string $relativeUrl
     * @param string $method
     * @param array $body
     * @return Paystack
     * @throws Exception
     */
    private function setHttpResponse($relativeUrl, $method, $body = [])
    {
        if (is_null($method)) {
            throw new Exception("Empty method not allowed");
        }
        $this->response = $this->client->{strtolower($method)}(
          'https://3.basecampapi.com/3950847' . $relativeUrl,
            ["body" => json_encode($body)]
        );

        //dd($this);

        return $this;
    }

    /**
     * Get the whole response from a get operation
     * @return array
     */
    private function getResponse()
    {
      $data = json_decode($this->response->getBody(), true);
      $next = $this->response->getHeader('Link');

      //dd($data);
      while($next){
        $next = $next[0];
        $next_url = trim(explode(';', $next)[0], "<>");
        $res = Http::withToken($this->access_token)->get($next_url);

        $data = array_merge($data, $res->json());

        $next = $res->getHeader('Link');
      }

        return $data;
    }

  public function getPeople()
  {
    $people =  (new self)->setHttpResponse('/people.json', 'GET')->getResponse();

    $value = Cache::set('bc_people', $people);

    return $value;
  }

  public function getAllProjects()
  {
    $projects =  (new self)->setHttpResponse('/projects.json', 'GET')->getResponse();

    Cache::set('bc_projects', $projects);
  }

  public function getAllCampfires()
  {
    $campfires = (new self)->setHttpResponse('/chats.json', 'GET')->getResponse();

    Cache::set('bc_campfires', $campfires);
  }

  public function getAllActivities()
  {
    
    $this->session = env('BASECAMP_SESSION');
    $this->identity = env('BASECAMP_IDENTITY');
    $this->verification = env('BASECAMP_VERIFICATION');
    //dd($verification);

    $activities = Http::withCookies(['_bc3_session' => $this->session, '_dd_s', 'bc3_identity_id' => $this->identity, 'bc3_session_verification_token' => $this->verification], '3.basecamp.com')->get('https://3.basecamp.com/3950847/reports/progress.json');
      
      $data = array_filter($activities->json(), function($val) {
        if($val['kind'] === 'question_answer_created'){
          return $val;
        }
      }); 

      $this->next = $activities->header('Link');

      $results = LazyCollection::times(2000)->map(function(){
        $next_url = trim(explode(';', $this->next)[0], "<>");

        $res = Http::withCookies(['_bc3_session' => $this->session, '_dd_s', 'bc3_identity_id' => $this->identity, 'bc3_session_verification_token' => $this->verification], '3.basecamp.com')->get($next_url);

        $this->next = $res->header('Link');

        $result = array_filter($res->json(), function($val) {
          if($val['kind'] === 'question_answer_created'){
            return $val;
          }
        }); 

        return $result;
        
      })->all();

      foreach($results as $result){
        $data = array_merge($data, $result);   
      }
     
      $db_data = [];
      
      foreach(array_chunk($data, 100) as $data_chunk){ 
        array_push($db_data, [
          'type' => 'activities',
        'data' => json_encode($data_chunk)
      ]);
    }

    ModelsBasecamp::insert($db_data);

       dd($data);

  }

  public function getPeopleOnProject($id)
  {
    return (new self)->setHttpResponse('/projects'.'/'.$id.'/people.json', 'GET')->getResponse();
  }

  public function getProjectSchedules($id, $schedule_id)
  {
    return (new self)->setHttpResponse('/buckets'.'/'.$id.'/schedules'.'/'.$schedule_id.'/entries.json', 'GET')->getResponse();
  }

  public function getProjectTodos($id, $todo_id)
  {
    return (new self)->setHttpResponse('/buckets'.'/'.$id.'/todolists'.'/'.$todo_id.'/todos.json', 'GET')->getResponse();
  }

}