this.GlobalUI = (function() {
	function GlobalUI() {}

	GlobalUI.dialog = {};

	GlobalUI.showDialog = function(opts) {
		this.dialog = $("[global-dialog]");
		this.dialog.heading = opts.heading;
		Session.set("global.ui.dialogData", opts.data);
		Session.set("global.ui.dialogTemplate", opts.template);
		return Tracker.afterFlush((function(_this) {
			return function() {
				return _this.dialog.openModal();
			};
		})(this));
	};


	GlobalUI.closeDialog = function() {
		return this.dialog.closeModal();
	};

	return GlobalUI;

})();
