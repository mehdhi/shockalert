/*
SMS listner app
*/
console.log("starting sms function");
document.addEventListener('deviceready', initSMSWatch, false);


function initSMSWatch() {
	var db = window.sqlitePlugin.openDatabase({name: "my.db", createFromLocation: 1});
  	db.transaction(function(tx) {
  		tx.executeSql('CREATE TABLE IF NOT EXISTS alert (id integer primary key, name text, filter text, phone text, level integer, status integer)');
        tx.executeSql('insert into alert (name, filter, phone, level, status) VALUES (?,?,?,?,?)', ['test1','','1234567',1,0]);
        });

    document.addEventListener('onSMSArrive', function(e){
    	console.log(JSON.parse(e));
    	var x = JSON.parse(e);
    	var data = x.body;
    	var phone = x.address;
    	console.log("data:"+data+" ===== phone:"+phone);
    	var al = checkSMSForAlert(phone,data);
		if (al){
			// sms matches to an alert
			// raise the alert now
			var level = al.level;
			var id = al.id;
			raiseAlert(id, level);
		}	
    });

	if(SMS) SMS.startWatch(function(){
		console.log('watching started');
	}, function(){
		console.log('failed to start watching');
	});
}

function checkSMSForAlert(phone, filter){
	var db = window.sqlitePlugin.openDatabase({name: "my.db", createFromLocation: 1});
	var p = phone;
	var f = filter;
	console.log("phone:"+p+"  ===  filter:"+p);
	if (p){
		
		var sql = "select id, level from alert where phone = '"+ p +"'";
		console.log(sql);
	  	db.transaction(function(tx) {
			tx.executeSql(sql, [], function(tx, res) {
				if (res.rows.length == 1){
					// matching row, alert now
				  	console.log("res.rows.length: " + res.rows.length );
				  	var j = {"level":res.rows.item(0).level, "id":res.rows.item(0).id}
				  	return j;
				}

			});
		});
	} else if (f){
		
		var sql = "select id, level from alert where like(filter,'"+ f +"')";
		console.log(sql);
	  	db.transaction(function(tx) {
			tx.executeSql(sql, [], function(tx, res) {
				if (res.rows.length == 1){
					// matching row, alert now
					console.log("res.rows.length: " + res.rows.length );
					var j = {"level":res.rows.item(0).level, "id":res.rows.item(0).id}
					return j;
				}		  	
			});
		});
	}
	return false;
}

function raiseAlert(id, level){
	var db = window.sqlitePlugin.openDatabase({name: "my.db", createFromLocation: 1});
	var id = id;
	var sql = "update alert set status = 1 where id ="+ id;
	  	db.transaction(function(tx) {
			tx.executeSql(sql, [], function(tx, res) {
					console.log("res.rows.length: " + res.rows.length );	  	
			});
		});
  	playMP3(level);
}

function playMP3(level) {
    var mp3URL = getMediaURL("media/siren.mp3");
    var media = new Media(mp3URL, null, mediaError);
    media.play();
}

function getMediaURL(s) {
    if(device.platform.toLowerCase() === "android") return "/android_asset/www/" + s;
    return s;
}

function mediaError(e) {
    alert('Media Error');
    console.log(JSON.stringify(e));
}

//Event: onSMSArrive, {"body":"test67","status":0,"address":"12345","read":0,"date_sent":1453360716000,"type":1,"seen":0,"date":1453360716352}
