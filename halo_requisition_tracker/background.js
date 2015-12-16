//Used to replace names like ArmorSuit and Equipment with their proper names
var prettyNames = {
	"ArmorSuit": "Armor",
	"WeaponSkin": "Weapon Skin",
	"PowerWeapon": "Power Weapon",
	"Equipment": "Boost",
}

//Add the button to the url bar on waypoint requisition pages
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
         conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: '.*halowaypoint.com/.*/games/halo-5-guardians/xbox-one/requisitions/categories/.*' }
          })
        ], 
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

//Go to each of the 3 req pages which when loaded parse themselves
function goToPage(key){
	chrome.tabs.getSelected(null, function(tab){
		switch(key){
			case '1':
				chrome.tabs.update(tab.id, {url: "https://www.halowaypoint.com/en-ca/games/halo-5-guardians/xbox-one/requisitions/categories/customization?ownedOnly=False&parse=" + key});
				break;
			case '2':
				chrome.tabs.update(tab.id, {url: "https://www.halowaypoint.com/en-ca/games/halo-5-guardians/xbox-one/requisitions/categories/loadout?ownedOnly=False&parse=" + key});
				break;
			case '3':
				chrome.tabs.update(tab.id, {url: "https://www.halowaypoint.com/en-ca/games/halo-5-guardians/xbox-one/requisitions/categories/powerandvehicle?ownedOnly=False&parse=" + key});
				break;
			case 'd': //We're done
				chrome.storage.local.get('haloreq-sourceurl', function(values){
					//Return to the original url
					url = "haloreq-sourceurl" in values ? values['haloreq-sourceurl'] : {}
					chrome.tabs.update(tab.id, {url: url});
					//Copy the list to the clipboard
					copyAll();
				});
				break;
				
		}
	});	
}

//Listen for messages from the content script
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		//When the content script sends the parse command, go to the next page to parse it
		if (request.action == "parse"){
			goToPage(request.page);
		}
	}
);

//Listen for clicks on the url button
chrome.pageAction.onClicked.addListener(function(tab) {
	//Get the current tab so we can get it's url and store it for later
	chrome.tabs.getSelected(null, function(tab){
		//Remove the old data
		chrome.storage.local.remove('haloreq');
		//Save the original url
		chrome.storage.local.set({'haloreq-sourceurl': tab.url});
		//Notify that we're about to parse
		chrome.notifications.create({'type':'basic','iconUrl':'icon-48.png','title':'Storing Requisitions','message':'Updating your Halo 5 requisition list.'});
		//Go to the first page which will parse it
		goToPage("1");
	});
});

//Copying a list to the clipboard
function copy(list){
	//Empty the background page, add a textarea
	$('body').html("<textarea></textarea>");
	//For each item in the list, add it to the textarea
	for (var i = 0; i < list.length; i++){
		$('textarea').append(list[i]);
	}
	//Select the content to be copied
	$('textarea').select();
	try{
		//Try to cut the data
		var success = document.execCommand('cut');
		if (success){
			//Notify successful cut!
			chrome.notifications.create({'type':'basic','iconUrl':'icon-48.png','title':'Requisitions Copied','message':'Your Halo 5 requisition list has been copied to your clipboard.'});
		}else{
			//Didn't work, throw an error for the failed message
			throw 404;
		}
	} catch(err) {  
		//Notify that it failed
		chrome.notifications.create({'type':'basic','iconUrl':'icon-48.png','title':'Error','message':'Unable to copy the requisition list to your clipboard.'});  
	} 
}


//Copy all reqs from all subcategories into one list
function copyAll(){
	//Load the req list
	chrome.storage.local.get('haloreq', function(values){
		haveList = "haloreq" in values ? values['haloreq'] : {};
		//New list rather than dict to be passed to the copy function
		fullList = [];
		//Only if there is a subcategory (Basically making sure it was already parsed)
		if (Object.keys(haveList).length >= 1){
			//For each subcategory
			for (key in haveList){
				//Push a header like "Armor      -----------" tab separated for easy spreadsheet pasting!
				fullList.push((key in prettyNames ? prettyNames[key] : key) + "\t-------------------\n");
				//For each req in that subcategory
				for (var i = 0; i < haveList[key].length; i++){
					//Push it to the list as "id      name"
					fullList.push(haveList[key][i][0] + "\t" + haveList[key][i][1] + "\n");
				}
			}
			//Copy the entire list to the clipboard
			copy(fullList);
		}else{
			//List was empty, most likely didn't scan first
			chrome.notifications.create({'type':'basic','iconUrl':'icon-48.png','title':'Sorry!','message':'No requisitions found. Try parsing again.'});
		}
	});
	
}

