chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
         conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'www.halowaypoint.com/en-ca/games/halo-5-guardians/xbox-one/requisitions/categories/customization' },
          }),
		  new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'www.halowaypoint.com/en-ca/games/halo-5-guardians/xbox-one/requisitions/categories/loadout' },
          }),
		  new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'www.halowaypoint.com/en-ca/games/halo-5-guardians/xbox-one/requisitions/categories/powerandvehicle' },
          })
        ],
 
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

function Notifier() {}

chrome.pageAction.onClicked.addListener(function(tab) {
	chrome.storage.local.get('haloreq', function(values){
		haveList = "haloreq" in values ? values['haloreq'] : {}
		$('body').html("<textarea></textarea>");
		for (key in haveList){
			$('textarea').append("------"+ (key == "Equipment" ? "Boost" : key) +"-------\n");
			for (val in haveList[key]){
				item = (haveList[key][val]).toLowerCase()
				item = item.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
				$('textarea').append(String(item).trim()+"\n");
			}
		}
		$('textarea').select();
		try{
			var success = document.execCommand('cut');
			if (success){
				chrome.notifications.create({'type':'basic','iconUrl':'icon-48.png','title':'Requisitions Copied','message':'Halo 5 requisition list has been copied to your clipboard.'});
			}else{
				throw 404;
			}
		} catch(err) {  
			chrome.notifications.create({'type':'basic','iconUrl':'icon-48.png','title':'Error','message':'Unable to copy the requisition list to your clipboard.'});  
		} 
		
	});
});