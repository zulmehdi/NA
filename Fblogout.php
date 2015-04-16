<?php


	require_once( 'lib/Facebook/FacebookSession.php');
	require_once( 'lib/Facebook/FacebookRequest.php' );
	require_once( 'lib/Facebook/FacebookResponse.php' );
	require_once( 'lib/Facebook/FacebookSDKException.php' );
	require_once( 'lib/Facebook/FacebookRequestException.php' );
	require_once( 'lib/Facebook/FacebookRedirectLoginHelper.php');
	require_once( 'lib/Facebook/FacebookAuthorizationException.php' );
	require_once( 'lib/Facebook/GraphObject.php' );
	require_once( 'lib/Facebook/GraphUser.php' );
	require_once( 'lib/Facebook/GraphSessionInfo.php' );
	require_once( 'lib/Facebook/Entities/AccessToken.php');
	require_once( 'lib/Facebook/HttpClients/FacebookCurl.php' );
	require_once( 'lib/Facebook/HttpClients/FacebookHttpable.php');
	require_once( 'lib/Facebook/HttpClients/FacebookCurlHttpClient.php');

	
	use Facebook\FacebookSession;
	use Facebook\FacebookRedirectLoginHelper;
	use Facebook\FacebookRequest;
	use Facebook\FacebookResponse;
	use Facebook\FacebookSDKException;
	use Facebook\FacebookRequestException;
	use Facebook\FacebookAuthorizationException;
	use Facebook\GraphObject;
	use Facebook\GraphUser;
	use Facebook\GraphSessionInfo;
	use Facebook\FacebookHttpable;
	use Facebook\FacebookCurlHttpClient;
	use Facebook\FacebookCurl;

/*PROCESS*/
	
	 session_start();


	 if(isset($_REQUEST['logout'])){
	 	unset($_SESSION['fb_token']);
	 }
	
	$app_id = '1555946448004744';
	$app_secret = '6e6658a57d9529ee2f0b57f53434ce81';
	$redirect_url='http://chatae.3eeweb.com/Fbogout=true';

	 FacebookSession::setDefaultApplication($app_id,$app_secret);
	 $helper = new FacebookRedirectLoginHelper($redirect_url);
	 $sess = $helper->getSessionFromRedirect();

	if(isset($_SESSION['fb_token'])){
	 	$sess = new FacebookSession($_SESSION['fb_token']);
	}

	$logout = 'http://chatae.3eeweb.com/Fblogout=true';

	 	if(isset($sess)){
	 		$_SESSION['fb_token']=$sess->getToken();
	 		$request = new FacebookRequest($sess,'GET','/me');
			$response = $request->execute();
			$graph = $response->getGraphObject(GraphUser::classname());
			$name = $graph->getName();
			$id = $graph->getId();
			$image = 'https://graph.facebook.com/';
			$email = $graph->getProperty('email');
				$gender = $graph->getProperty('gender');
			echo "hi $name <br>";
			echo "your email is $email <br><Br>";
			echo "your Gender is $gender <br><Br>";
			echo "<img src='$image' /><br><br>";
			echo "<a href='".$logout."'><button>Logout</button></a>";
	 	}else{
	 		echo '<a href="'.$helper->getLoginUrl(array('email')).'" >Login with facebook</a>';
	 	}











	
