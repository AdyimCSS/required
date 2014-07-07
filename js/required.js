(function($){
	$.required = function(){}
	$.required.chkEmail = function(_email){
		var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return filter.test(_email);
	}
	$.required.chkNumber = function(_num){
		var filter  = /^-{0,1}\d*\.{0,1}\d+$/;
		return filter.test(_num);
	}
	$.required.chkLength9 = function(_num){
		if(_num.length != 9){
			return false;
		}else {
			return true;	
		}
	}
	$.required.chkLength10 = function(_num){
		if(_num.length != 10){
			return false;
		}else {
			return true;	
		}
	}
	$.required.chkLength9to10 = function(_num){
		if(_num.length != 9 || _num.length != 10){
			return false;
		}else {
			return true;	
		}
	}
	$.required.chkTelFormat = function(_num){
		if(_num.charAt(0) != 0){
			return false;
		}else {
			return true;	
		}
	}
	$.required.chkUrl = function(_url){
		var filter  = /^(ftp|https?):\/\/+(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/;
		return filter.test(_url);
	}
	$.required.chkFBURL = function(_url){
		var chk1 = 'http://';
		var chk2 = 'https://';
		var chk3 = 'facebook';
		
		if(_url.indexOf(chk1) >= 0 || _url.indexOf(chk2) >= 0){
			if(_url.indexOf(chk3) > 0){
				return true;
			}
		}
		
		return false;
	}
	$.required.chkFBUser = function(_url){
		var chk1 = 'http://';
		var chk2 = 'https://';
		var chk3 = 'facebook.com/';
		var arr;
		
		if(_url.indexOf(chk1) >= 0 || _url.indexOf(chk2) >= 0){
			if(_url.indexOf(chk3) > 0){
				arr = _url.split(chk3);
				if(arr[1] != ''){
					return true;
				}
			}
		}
		
		return false;
	}
	$.required.chkText = function(_text){
		if(_text == ""){
			return false;
		}else{
			return true;
		}
	}
	$.required.chkBox = function(_name) {
		if($('input[name='+_name+']').attr('checked') == "checked"){
			return true;
		}else{
			return false;
		}
	 }
	$.required.chkRadio = function(_name) {
		if($('input[name='+_name+']:checked').length > 0){
			return true;
		}else{
			return false;
		}
	 }
	 $.required.checkValue = function(obj){
		// value default
		var vdf = {
			arr				: [],
			idForm 			: "formRequired", 
			errorClass		: "error",  
			onError			: function(msg){alert(msg);}
		}
		if(obj) $.extend(vdf, obj);
		vdf.idForm = $("#"+vdf.idForm);
		
		// check arr
		
		if(vdf.arr.length > 0){
			for(var i = 0; i < vdf.arr.length; i++){
				for(var j = 0; j < vdf.arr[i].chk.length; j++){
					switch(vdf.arr[i].chk[j].f){
						case "chkBox" : 
							if(!$.required.chkBox(vdf.arr[i].n)){
								// add class
								vdf.idForm.find("[name="+vdf.arr[i].n+"]").addClass(vdf.errorClass).focus();
								
								// onError
								vdf.onError(vdf.arr[i].chk[j].msg);
								return false;
							}else {
								// remove class
								vdf.idForm.find("[name="+vdf.arr[i].n+"]").removeClass(vdf.errorClass);
							}
						break;
						case "chkRadio" : 
							if(!$.required.chkRadio(vdf.arr[i].n)){
								// add class
								vdf.idForm.find("[name="+vdf.arr[i].n+"]").addClass(vdf.errorClass).focus();
								
								// onError
								vdf.onError(vdf.arr[i].chk[j].msg);
								return false;
							}else {
								// remove class
								vdf.idForm.find("[name="+vdf.arr[i].n+"]").removeClass(vdf.errorClass);
							}
						break;
						default : 
							if(!$.required[vdf.arr[i].chk[j].f](vdf.idForm.find("[name="+vdf.arr[i].n+"]").val())){
								// add class
								vdf.idForm.find("[name="+vdf.arr[i].n+"]").addClass(vdf.errorClass).focus();
								
								// onError
								vdf.onError(vdf.arr[i].chk[j].msg);
								return false;
							}
							else {
								// remove class
								vdf.idForm.find("[name="+vdf.arr[i].n+"]").removeClass(vdf.errorClass);	
							}
						break;
					}
				}
			}
		}
		return true;
	}
})(jQuery);