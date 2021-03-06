/**
 * Module for displaying "Waiting for..." dialog using Bootstrap
 *
 * @author Eugene Maslovich <ehpc@em42.ru>
 */

var waitingDialog = waitingDialog || (function ($) {
    'use strict';

	// Creating modal dialog's DOM
	var $dialog = $(
		'<div class="modal fade waitingDialog" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
		'<div class="modal-dialog modal-m">' +
		'<div class="modal-content">' +
      '<button style="float: right; padding: 2px; margin: 4px;" class="ui-dialog-titlebar-close">x</button>' +
			'<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
			'<div class="modal-body">' +
				'<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
			'</div>' +
		'</div></div></div>');

	return {
		/**
		 * Opens our dialog
		 * @param message Custom message
		 * @param options Custom options:
		 * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
		 * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
		 */
		show: function (message, options) {
			// Assigning defaults
			if (typeof options === 'undefined') {
				options = {};
			}
			if (typeof message === 'undefined') {
				message = 'Loading...';
			}
			var settings = $.extend({
				dialogSize: 'm',
				progressType: '',
				onHide: null, // This callback runs after the dialog was hidden
        ignoreCalls: false
			}, options);

      if (!$dialog.hasClass('ignoreCalls') || settings.ignoreCalls) {
        // Configuring dialog
  			$dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
  			$dialog.find('.progress-bar').attr('class', 'progress-bar');
  			if (settings.progressType) {
  				$dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
  			}
  			$dialog.find('h3').text(message);
  			// Adding callbacks
  			if (typeof settings.onHide === 'function') {
  				$dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
  					settings.onHide.call($dialog);
  				});
  			}
        $dialog.find('.ui-dialog-titlebar-close').html('<i class="fa fa-times" aria-hidden="true"></i>').click(function(event){
           $dialog.modal('hide');
        });
  			// Opening dialog
  			$dialog.modal();
      }

      if (settings.ignoreCalls) {
        $dialog.addClass('ignoreCalls');
      }
		},
		/**
		 * Closes dialog
		 */
		hide: function (ignoreCalls) {
      if (!$dialog.hasClass('ignoreCalls') || (!isNull(ignoreCalls) && ignoreCalls)) {
  			$dialog.modal('hide');
        $dialog.removeClass('ignoreCalls');
        $(".modal-backdrop").remove();
      }
		},

    hideProgress: function () {
      $dialog.find(".progress").html('<div class="progress-bar" style="width: 100%">');
    },

    setProgress: function (progressPercent) {
      $dialog.find(".progress").html('<div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="' + progressPercent + '" aria-valuemin="0" aria-valuemax="100" style="width:' + progressPercent + '%">' +
                                         progressPercent + '%' +
                                      '</div>');
    }
	};

})(jQuery);
