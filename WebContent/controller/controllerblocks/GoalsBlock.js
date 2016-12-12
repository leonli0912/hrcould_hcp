sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";
 
	var GoalsBlock = BlockBase.extend("ui5TileTrial.controller.controllerblocks.GoalsBlock", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "ui5TileTrial.view.viewblocks.GoalsBlock",
					type: "XML"
				},
				Expanded: {
					viewName: "ui5TileTrial.view.viewblocks.GoalsBlock",
					type: "XML"
				}
			}
		}
	});
	return GoalsBlock;
}, true);