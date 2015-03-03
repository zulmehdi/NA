<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Home</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<link rel="stylesheet" href="css/simple-sidebar.css" />
		
		<style>
			html, body {
				height: 100%;
			}
			
			.channel {
				font-style: italic;
			}
			
			.user-badge {
				position: absolute;
				margin-left: 24px;
				bottom: 12px;
				width: 50%;
			}
			
			.user-dp-sm img {
				float: left;
				width: 40px;
				height: 40px;
			}
			
			.user-name {
				margin-left: 50px;
				font-size: 24pt;
				color: #fff;
			}
			
			.channel-name {
				
			}
			
			.message-window {
				width: 100%;
				height: 100%;
			}
			
			.messages {
				width: 100%;
				height: auto;
				position: fixed;
				bottom: 48px;
			}
			
			.message {
				
			}
			
			.chat-box {
				width: 100%;
				position: fixed;
				bottom: 20px;
			}
		</style>
	</head>
	<body>	
		<!-- NAVIGATION BAR
		<div class="navbar navbar-inverse navbar-static-top">
			<div class="navbar-header">
				<a href="#" class="navbar-brand">Chat</a>
				
				<button class="navbar-toggle" data-toggle="collapse" data-target=".navHeaderCollapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
			</div>
			
			<div class="container collapse navbar-collapse navHeaderCollapse">
				<ul class="nav navbar-nav navbar-right">
					<li class="active">
						<a href="#">Home</a>
					</li>
					<li>
						<a href="#">Blog</a>
					</li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">Social Media <b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li>
								<a href="#">Facebook</a>
								<a href="#">Twitter</a>
								<a href="#">Google+</a>
								<a href="#">Instagram</a>
							</li>
						</ul>
					</li>
					<li>
						<a href="#">About</a>
					</li>
					<li>
						<a href="#">Contact</a>
					</li>
				</ul>
			</div>
		</div>
		END OF NAVIGATION BAR -->

	<div id="wrapper">

        <!-- Sidebar -->
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    <a href="#">
                        Channels
                    </a>
                </li>
                <li class="channel active">
                    <a href="#">#General</a>
                </li>
                <li class="channel">
                    <a href="#">#Tech</a>
                </li>
                <li class="channel">
                    <a href="#">#Sports</a>
                </li>
                <li class="channel">
                    <a href="#">#Gaming</a>
                </li>
                <li class="channel">
                    <a href="#">#Random</a>
                </li>
                <li>
                    <a href="#">+Create</a>
                </li>
            </ul>
            
            <div class="user-badge">
            	<div class="user-dp-sm">
            		<img src="images/drwhochibieye1.png" />
            	</div>
            	<div class="user-name">
            		zul110
            	</div>
            </div>
            
        </div>
        <!-- /#sidebar-wrapper -->
        
        <!-- Sidebar -->
        <div id="sidebar-wrapper-right">
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    <a href="#">
                        Users
                    </a>
                </li>
                <li class="channel">
                    <a href="#">munir123</a>
                </li>
                <li class="channel">
                    <a href="#">sumit234</a>
                </li>
                <li class="channel">
                    <a href="#">kunal111</a>
                </li>
                <li>
                    <a href="#">Search</a>
                </li>
            </ul>
        </div>
        <!-- /#sidebar-wrapper -->
        
        <!-- Page Content -->
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="channel-name col-lg-12">
                        <h1>#General</h1> 
                    </div>
                    
                    <div class="message-window">
	                    <ul id="messages" class="messages">
	                    	<li class="message">
	                    		zul110: test
	                    	</li>
	                    	<li class="message">
	                    		sumit123: hello
	                    	</li>
	                    </ul>
                    </div>
                    
                    <div class="chat-box">
					  <div class="col-lg-8 col-md-6 col-sm-4 col-xs-2">
					    <div class="input-group">
					      <input id="message-box" type="text" class="form-control" placeholder="Type your message here...">
					      <span class="input-group-btn">
					        <button class="btn btn-default" type="button" onclick="sendMessage(document.getElementById('message-box'));">Send</button>
					      </span>
					    </div><!-- /input-group -->
					  </div><!-- /.col-lg-6 -->
					</div><!-- /.row -->
                </div>
            </div>
        </div>
        <!-- /#page-content-wrapper -->
        
        
        
		<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script> -->
		<script src="js/jquery.js"></script>
		<!-- <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js" type="text/javascript"></script> -->
		<script src="js/bootstrap.min.js" type="text/javascript"></script>
		
		<script type="text/javascript">
			function sendMessage(message) {
				if(message.value != null || message.value != "") {
					var ul = document.getElementById("messages");
					var li = document.createElement("li");
					li.appendChild(document.createTextNode("zul110: " + message.value));
					ul.appendChild(li);
					
					message.value = "";
					message.focus();
				}
			}			
		</script>
	</body>
</html>