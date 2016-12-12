sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";
 
	var GoalsBlock = BlockBase.extend("ui5TileTrial.controller.controllerblocks.PayrollBlock", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "ui5TileTrial.view.viewblocks.PayrollBlock",
					type: "XML"
				},
				Expanded: {
					viewName: "ui5TileTrial.view.viewblocks.PayrollBlock",
					type: "XML"
				}
			}
		}
	});
	return GoalsBlock;
}, true);