sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";
 
	var GoalsBlock = BlockBase.extend("ui5TileTrial.controller.controllerblocks.JobBlockEdit", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "ui5TileTrial.view.viewblocks.JobBlockEdit",
					type: "XML"
				},
				Expanded: {
					viewName: "ui5TileTrial.view.viewblocks.JobBlockEdit",
					type: "XML"
				}
			}
		}
	});
	return GoalsBlock;
}, true);