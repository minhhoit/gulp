/**
 * Global action for site
 */
var Sites = function() {
    var $dialog = $(
        '<div class="modal fade" data-backdrop="false" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:0; overflow-y:visible;"><div class="modal-backdrop fade in"></div>' +
        '<div class="modal-dialog modal-m">' +
        '<div class="modal-content">' +
            '<div class="modal-header box-status"><button type="button" class="close" data-dismiss="modal">&times;</button><h3 style="margin:0;"></h3></div>' +
            '<div class="modal-body">' +
                '<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
            '</div>' +
        '</div></div></div>');

    var $confirm = $(
        '<div class="modal fade" data-backdrop="false" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:0; overflow-y:visible;"><div class="modal-backdrop fade in"></div>' +
        '<div class="modal-dialog modal-m">' +
        '<div class="modal-content">' +
            '<div class="modal-header box-status"><button type="button" class="close" data-dismiss="modal">&times;</button><h3 style="margin:0;"></h3></div>' +
            '<div class="modal-body">' +
                '<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button type="button" class="btn btn-success btn-yes">Yes</button>' +
                '<button type="button" class="btn btn-default" data-dismiss="modal">No</button>' +
            '</div>' +
        '</div></div></div>');

    return {
        init: function() {
        },
        hide: function(type) {
            /**
             * 1: Dialog
             * 2: Confirm
             */
            type = type || 1;
            if (type==1) {
                $dialog.modal('hide');
            } else {
                $confirm.modal('hide');
            }
            return !0;
        },
        showMessage: function(type, msg) {
            type = type || 1;
            msg = msg || '';
            var $_tar = $('#message'),
            $_cl = 'alert-success';

            if (type == 2) {
              $_cl = 'alert-danger';
            }
            if (!$_tar.length) {
                $('<div id="message" class="bg-dask"><div class="container no-padding"></div></div>').insertBefore('#content');
                $_tar = $('#message');
            }

            $_tar.find('.container').empty().append('<div class="alert '+$_cl+'" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+msg+'</div>');

            var $timer = setTimeout(function(){
                $('.' + $_cl).hide();
            }, 1500);
            clearTimeout($timer);
        },
        showModal: function(target, content, options) {
            target = target || {};
            content = content || {};

            var settings = $.extend({
                dialogSize: 'm',
                callback: null
            }, options);

            target.find('.modal-body').append(content);
            $dialog.modal('show');
        },
        showConfirm: function(title, content, options) {
            content = content || {};
            options = options || {};
            title = title || 'Saigon FNB Notification';
            var settings = $.extend({
                dialogSize: 'm',
                callback: null,
                target: null
            }, options);

            if (settings.callback) {
                $confirm.find('.btn-yes').on('click', function(e) {
                    e.preventDefault();
                    ADWFunc.specialFunction[settings.callback](settings.target);
                    $confirm.modal('hide');
                });
            } else {
                $confirm.find('.btn-yes').on('click', function(e) {
                    e.preventDefault();
                    $confirm.modal('hide');
                });
            }

            $confirm.find('.modal-header h3').empty().append(title);
            $confirm.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
            $confirm.find('.modal-body').empty().append(content);
            $confirm.modal('show');
        }
    };
}();

$(document).ready(function()
{
    Sites.init();
});
