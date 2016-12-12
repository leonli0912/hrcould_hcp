sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";
 
	var GoalsBlock = BlockBase.extend("ui5TileTrial.controller.controllerblocks.PayrollBlockEdit", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "ui5TileTrial.view.viewblocks.PayrollBlockEdit",
					type: "XML"
				},
				Expanded: {
					viewName: "ui5TileTrial.view.viewblocks.PayrollBlockEdit",
					type: "XML"
				}
			}
		}
	});
	return GoalsBlock;
}, true);