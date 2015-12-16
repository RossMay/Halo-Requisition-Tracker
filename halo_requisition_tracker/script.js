//Only run any of this if the url contains a get variable named parse (Which gets added by the extension while parsing)
if (decodeURIComponent(window.location.search.substring(1)).indexOf("parse=") != -1){
	var name = ""; //Req item name
	var subcategory = ""; //Subcategory name
	
	//List of special items. Mostly weapons because the names are dumb, and weapon skins as the names on the website don't have the gun type
	//so we end up with 4 named "Fade". This looks up their IDs and replaces it with something useful like "Fade AR"
	//Also some shortened names are used on the site, this lengthens them
	var lookup = {'d6d8bc3e-4f51-4e5b-b93e-89d2f2675156':'Emile\'s Regards','60352281-af85-488b-b5f2-135945203a79':'Don\'t Flip Out','1a59ccc2-9167-4a28-90e4-7067ef607449':'Liang Dortmund Seal','906f4cb7-1d08-4dde-93f6-10c044be7c27':'Fade AR','37960d1c-695f-4917-ad9d-912f3966df46':'Fade BR','e2553b33-1896-4d26-be02-4c4ea8a908bb':'Fade SMG','3c6d7385-2e30-4488-8b5b-28c382dea47b':'Fade DMR','06f00f89-d7e3-4423-b7b7-dd8e09edba06':'Fade Magnum','62006eb3-a941-4619-b902-502dacccfffb':'Green Machine SMG','fa1dc247-759a-4fd5-a997-0213684677e9':'Green Machine Magnum','8493f423-582e-49f9-b5ba-b7ff77c69a4a':'Green Machine DMR','df401a67-50f5-48fd-a444-67c795e905d3':'Green Machine BR','3fa1a9e2-0b53-4712-ab3e-e3dd4b712bb0':'Green Machine AR','3815bb28-58b5-419d-b181-fd4dd9c1a23a':'Spiral AR','9dca7c50-60e1-4311-8445-d163094db301':'Spiral BR','e8605553-44b2-4c24-8ae1-e170db07f839':'Spiral SMG','a7d0a3d9-c19d-4e91-8232-d41c78d14895':'Spiral DMR','b560316d-f7d1-4be0-8d59-6cf9c3e1bdb0':'Spiral Magnum','56b6ae3f-ca7a-4f93-9476-827ceacaa032':'Steel AR','b294ed71-2a37-4696-af77-2a6f165c468f':'Vengeance AR','2b42d045-8feb-4704-9778-21b86a916b96':'Bloodthirst BR','cb082c4c-1160-4d81-8039-0ecaeea52e20':'Lagrange AR','7a6513ed-c452-4b74-873c-c50435d82dfa':'Ruptive AR','114a6ec8-5e6a-47a6-93f0-947ecf3d3a94':'Ruptive BR','5048cd7d-d483-4f4a-9e9a-7894f13a40b0':'Ruptive SMG','30565b36-5354-402c-b51b-9e934a161c63':'Ruptive Magnum','7f1f0f13-a4f0-41cd-a47f-f0f9d4baa0bd':'Ruptive DMR','c1637597-a855-4c2a-beb2-7c2ab7a08b2a':'Bracer Magnum','b0f360f5-941b-43f2-956e-aebb49230713':'Bracer AR','0b0276c4-ff63-4e06-9466-12d3a7f0213a':'Bracer BR','a9fdaa00-2c0d-47d2-bcba-033285f809eb':'Bracer SMG','12bdaacd-f227-497c-ad28-b98d4d1cd6e0':'Bracer DMR','8f182ed4-efe3-40ac-aa17-140721d5d2ef':'Clash DMR','29562d20-a9fb-480e-bd9b-3c534a5f8b14':'HCS Contender AR','c98c6c47-e044-4afa-8496-95d4225fed78':'HCS Contender Magnum','4e5c6f5f-878f-47fa-bb53-4396559a2515':'Potence SMG','4efddb54-841d-4c8b-9f49-fdc9d023aef3':'AR Projection Sight','2ed3fd38-ace4-4730-8e14-e754800c2d8b':'AR Projection Sight, Long Barrel','1444cab7-8deb-41d7-914c-b035bb44c45b':'AR Projection Sight, Laser Targeter','a2a25bc0-9cad-422d-a86b-e595af2975db':'AR Projection Sight, Silencer','5e5d2eb9-2024-47ad-9db3-b93625ea95a7':'AR Projection Sight, Stabilization Jets','01f930ce-fe76-42c6-8ee3-b52bb672eec8':'AR Projection Sight, Energy Bayonet','f82fcc4f-0fda-4d37-88d8-1d4e3d317122':'AR Projection Sight, Kinetic Bolts','82c09e3b-dbc3-41a3-8eb1-aad79e3f59c8':'AR Recon Sight','820585f2-7244-487e-a112-e866a4063e98':'AR Recon Sight, Long Barrel','4ec11bd1-0dda-477b-88ad-f4e844e44fab':'AR Recon Sight, Laser Targeter','d3859cff-9b92-43d0-8664-cf78aec45cd7':'AR Recon Sight, Silencer','5428232b-e1ff-4a63-979e-10ec138a8129':'AR Recon Sight, Stabilization Jets','0c421c63-9853-42c3-83dc-732aea73e296':'AR Recon Sight, Kinetic Bolts','e4d86e6d-3e71-47f1-8f5b-662683b16433':'AR Longshot Sight','d760ed49-9fd3-4f29-a4d8-63a220c86ccf':'AR Longshot Sight, Long Barrel','c1ff61d1-f180-4548-8da2-37f6fe4e00cb':'AR Longshot Sight, Laser Targeter','5a815c22-d7b6-4746-899e-eadee136c0b4':'AR Longshot Sight, Silencer','60357ca9-a035-414f-bf70-b0aa83e5a9d8':'AR Longshot Sight, Stabilization Jets','7b784241-792b-494f-9c64-ea9329be6f7c':'AR Longshot Sight, Kinetic Bolts','f9eeaf93-f9e1-474e-8e4a-3d98095cc2ba':'AR Recon Sight, Energy Bayonet','b9f17910-07ff-440b-aa12-fc2557e6a5c7':'AR Longshot Sight, Energy Bayonet','34fc89f8-93ac-4158-9128-64c91ad1cdf7':'BR Recon Sight','0a34e2e6-07be-4c18-aff0-93b9a2322c2d':'BR Recon Sight, Long Barrel','02f5ac63-6005-4852-bcde-fd9066836789':'BR Recon Sight, Laser Targeter','637674e3-c1e3-4c17-839d-ef237e336328':'BR Recon Sight, Silencer','7c12cbec-bfad-44d8-88ab-73838bf5d64a':'BR Recon Sight, Stabilization Jets','4b64116c-dd5a-4d89-95d1-6b35c5cc7036':'BR Recon Sight, Energy Bayonet','378b078e-db3a-4e78-9b28-42fdcc7d6c6d':'BR Recon Sight, Kinetic Bolts','c2cc7ceb-ee66-4a16-996e-9d110407aab5':'BR Longshot Sight','837dfe29-10b5-45ee-a7f4-b2b7c685ac42':'BR Longshot Sight, Stabilization Jets','a111fca2-c089-4dbf-95f6-abd598ddfb05':'BR Longshot Sight, Energy Bayonet','d4e5ea84-fb1a-4c7a-92b4-d7de028b4e88':'BR Longshot Sight, Long Barrel','e905f4ee-8b61-42cb-807c-76bd91aa3a63':'BR Longshot Sight, Kinetic Bolts','e79a2f0d-0ec7-40cf-ae70-5194c6922b4d':'BR Longshot Sight, Laser Targeter','dc67c002-aec3-40fa-9d80-5d0d752fe104':'BR Longshot Sight, Silencer','068631cc-3273-47ba-8371-699594766bb0':'BR Sentinel Sight','abe02a9e-c84f-440c-a7e2-fc868a8b219a':'BR Sentinel Sight, Long Barrel','fc14448c-b4bf-4288-960e-cf0be434561c':'BR Sentinel Sight, Laser Targeter','b6a26613-9fa4-4f16-8dfe-e69c602a0d21':'BR Sentinel Sight, Silencer','120e9318-5c91-464c-b3a7-f72e6e7587b3':'BR Sentinel Sight, Stabilization Jets','eeab3998-aa62-441e-a488-49828e248deb':'BR Sentinel Sight, Energy Bayonet','a7e9a298-a876-4c4f-a7c0-af8bf9833762':'BR Sentinel Sight, Kinetic Bolts','3f53eb5a-ec3e-4a95-afdf-70b8cfe4e8c1':'DMR Longshot Sight','ac135f25-f351-4203-9b24-bd4885e3f68e':'DMR Longshot Sight, Long Barrel','070f751c-e79d-40fa-b903-3813eafb3d0f':'DMR Longshot Sight, Laser Targeter','324d0239-a357-47e9-bd48-57e57ecec6a0':'DMR Longshot Sight, Silencer','f7264987-63fe-4ea6-83f2-e9b21e4b104c':'DMR Longshot Sight, Stabilization Jets','5d3446da-8217-4c39-9b03-f2207e01189f':'DMR Longshot Sight, Energy Bayonet','ae4b99c2-7fc8-44f3-be64-29a120534624':'DMR Longshot Sight, Kinetic Bolts','cfa35b13-3f99-4a7b-a124-fe41389f138a':'DMR Recon Sight','76a2e241-d439-4067-ad2d-b67b065ba6eb':'DMR Recon Sight, Long Barrel','d16c09d9-1990-4ff9-91f9-d15e04a5d986':'DMR Recon Sight, Laser Targeter','ed3b1eb4-0e2b-4311-8a4f-c0f4a4996404':'DMR Recon Sight, Silencer','566c7a9f-8d0c-4e3e-bf0c-f6df9644c03b':'DMR Recon Sight, Stabilization Jets','c344911b-988f-4970-9884-67e1aaee1032':'DMR Recon Sight, Energy Bayonet','4e34cbbf-edfd-40fd-b3e5-05dd1561e760':'DMR Recon Sight, Kinetic Bolts','74564ce7-a7c3-4296-912e-c77d15251f93':'DMR Sentinel Sight','11a52eb1-5867-4a96-9cea-b0954bdc06a1':'DMR Sentinel Sight, Long Barrel','cccaf17b-7b7f-413b-8b11-3e79a6131b46':'DMR Sentinel Sight, Laser Targeter','867996c4-d355-4d72-9336-4148e1d2c774':'DMR Sentinel Sight, Silencer','dde542b0-8b74-4678-9629-6f5cf0310d54':'DMR Sentinel Sight, Stabilization Jets','227ef60c-3b8e-4e3c-95d1-e75cfff8038b':'DMR Sentinel Sight, Energy Bayonet','3cd2a2ad-d14c-4ae8-bbce-ba98d477447a':'DMR Sentinel Sight, Kinetic Bolts','29c73a62-bf05-4886-a242-2b066093be88':'Magnum','4c5e7e56-2dfc-4fe1-a683-e6dfe588f5b1':'SMG CQB Sight','1e67b3b3-4c2d-46a9-a05d-0c55d69476b5':'SMG CQB Sight, Long Barrel','db167088-34bc-4bd1-b697-9dcb0e739c8c':'SMG CQB Sight, Laser Targeter','0cce4dde-4ca1-4b48-b33d-53e4c6dbb1a5':'SMG CQB Sight, Silencer','054b27ad-767b-435a-b9ed-65a08fce5103':'SMG CQB Sight, Stabilization Jets','84abd38c-83cd-4943-8acc-7ca46ca619c8':'SMG CQB Sight, Energy Bayonet','1a93d106-bc65-4f0f-8e99-44bd87f254bf':'SMG CQB Sight, Kinetic Bolts','8cd3e98f-57c4-46a0-a25f-341548669f9d':'SMG Projection Sight','b4126069-ce5d-4201-8a46-275b6c31f11e':'SMG Projection Sight, Long Barrel','36971822-d3cb-4b43-bb7b-677b9f3d8589':'SMG Projection Sight, Laser Targeter','fec65234-0a9a-45fd-bf45-af87d190f390':'SMG Projection Sight, Silencer','553086f4-aa17-4a51-9ab1-85fad55a6aec':'SMG Projection Sight, Stabilization Jets','e69c4aea-fde6-4f21-85ac-dcdd4e41dc4f':'SMG Projection Sight, Energy Bayonet','a320e7a5-ed54-4664-b744-b6185b9f777e':'SMG Projection Sight, Kinetic Bolts','e52a5587-7f52-4964-9f00-8ff1abfaeed4':'SMG Recon Sight','4c8bbb0e-363c-4af5-850e-aec84d5defb1':'SMG Recon Sight, Long Barrel','88cb13a2-658c-47b2-a1e0-9d6a822f6faa':'SMG Recon Sight, Laser Targeter','1421f589-f286-428c-b824-eb0a01297566':'SMG Recon Sight, Silencer','5a85507b-fee8-49d8-8e7b-804f18bd4ba0':'SMG Recon Sight, Stabilization Jets','db96c4b9-8605-489c-8461-c597e40bd378':'SMG Recon Sight, Energy Bayonet','b538d8ea-c002-4c3a-9da6-0a77bebb8934':'SMG Recon Sight, Kinetic Bolts'};
	
	//Get the currently stored progress
	chrome.storage.local.get('haloreq', function(values){
		var haveList = "haloreq" in values ? values['haloreq'] : {}
		
		//We're going to remove each subcategory as we come upon it for the first time (For updating!). We'll store them here
		var foundCategory = []

		//Check for the power weapon / vehicle page
		var isCerts = (decodeURIComponent(window.location).indexOf("powerandvehicle") != -1);

		//For each req card on the page
		$('div.card button').each(
			function(){
				//Only ones we have
				if($(this).data('have-owned') == "True"){
					//Make sure we're certified if its the power weapons and vehicle page
					if (!isCerts || (isCerts && $(this).data('has-certification') == "True")){
						//For some reason all the weapons don't actually have a subcategory name, so if it's blank we change it to loadout
						subcategory = $(this).data('subcategory') == "" ? "Loadout" : $(this).data('subcategory');
						//If it's the first time we've seen this subcategory, empty it
						if (foundCategory.indexOf(subcategory) == -1){
							foundCategory.push(subcategory);
							haveList[subcategory]= [];
						}
						//If the subcategory itsn't in the list, we add it
						if (haveList[subcategory] === undefined){
							haveList[subcategory] = [];
						}
						//Lookup the pretty name from the list above
						if ($(this).data('id') in lookup){
							name = lookup[$(this).data('id')];
						}else{
							//No pretty name. It's all in caps, has broken ' character and trailing spaces. We'll fix that.
							name =  String($(this).data('name')).trim().toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ').replace('’','\'');
						}
						//Add an array of [id,name] to the subcategory
						haveList[subcategory].push([String($(this).data('id')),name]);
					}
				}
			}
		);
		//Store the list
		chrome.storage.local.set({'haloreq': haveList});
		
		//If we're on a parsing page, notify the extension that we're done which will send us to the next page, or finish parsing.
		if (decodeURIComponent(window.location.search.substring(1)).indexOf("parse=1") != -1){
			chrome.runtime.sendMessage({action: "parse", page: "2"});
		}else if(decodeURIComponent(window.location.search.substring(1)).indexOf("parse=2") != -1){
			chrome.runtime.sendMessage({action: "parse", page: "3"});
		}else if(decodeURIComponent(window.location.search.substring(1)).indexOf("parse=3") != -1){
			chrome.runtime.sendMessage({action: "parse", page: "d"});
		}
	});
}

