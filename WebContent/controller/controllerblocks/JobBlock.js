sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";
 
	var GoalsBlock = BlockBase.extend("ui5TileTrial.controller.controllerblocks.JobBlock", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "ui5TileTrial.view.viewblocks.JobBlock",
					type: "XML"
				},
				Expanded: {
					viewName: "ui5TileTrial.view.viewblocks.JobBlock",
					type: "XML"
				}
			}
		}
	});
	return GoalsBlock;
}, true);