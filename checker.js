const fs = require('fs');
const twit = require('twit');
const config = require('./config');

class checker{

	constructor(dir, file){
		this.dir=dir;
		this.file=file;
		this.T = new twit(config);
	}

	getLastItem(dir, callback){
	    fs.readdir(dir, function(err, files){
	        var files_array = files.map(function (fileName) {
	            return {
	                name: fileName,
	                time: fs.statSync(dir + '/' + fileName).mtime.getTime()
	            };
	        })
	        .sort(function (a, b) {
	            return b.time - a.time; })
	        .map(function (v) {
	            return v.name; });

	        callback(files_array);
	    }); 
	    
	}

	success (err, data, response){
	    console.log(data.text); //el tweet
	}

	toTitleCase(str)
	{
	    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}).replace(/ /g,'');
	}

	chekfiles() {
		//console.log('dir: ' + this.dir + ' file: ' + this.files);
		var self = this;
		this.getLastItem(this.dir, function(files){
			var directory = files[0];
	        var file = '';


	        self.getLastItem(self.dir + '/' + directory, function(files){
				var last_file = files[0].substr(0, files[0].indexOf('.'));//recortamos el nombre del archivo sin la extension
				//console.log(last_file);
	        
	            //abrimos el archivo json donde se almacenan el ultimo archivo visto.
	            fs.readFile(self.file, 'utf8', function (err,data) {
	                if (err) {
	                    return console.log(err);
	                }
	                data = eval(data);
	                if(data[0].file != last_file){ //se ha añadido un nuevo archivo
	                    var newdata = '[{"dir": "'+directory+'", "file": "'+last_file+'"}]';
	                    fs.writeFile(self.file, newdata, function(err) {
	                        console.log("The file was saved!");
	                    });

	                    //ahora lanzamos el nuevo tweet
	                    var params = {status: "I just finish '" + last_file + "' #" + self.toTitleCase(directory)}
	                    self.T.post('statuses/update', params, self.success);
	                }
	                //else{
	                //    console.log("ningún archivo nuevo");
	                //}
	            });
	        });
		});
	}

	start(){
		//setInterval(function() { self.func1(); }, 1000*5);
		setInterval(this.chekfiles.bind(this), 1000*60*10);
	}
	
	
}

module.exports = checker;