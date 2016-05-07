(function () {
    function CheckboxToInput (config) {
        var me = this;

        me.checkboxes = config.checkboxes;
        me.inputTarget = config.target;

        me.__onClick = function (e) {
            me.onCheckboxClick.apply(me, arguments);
        };

        this.loopTroughCheckboxes('attachListeners');
    };

    CheckboxToInput.prototype.loopTroughCheckboxes = function(reason) {
        for (var i = 0, checkboxes = this.checkboxes, ln = checkboxes.length; i < ln; i++) {
            this[reason](checkboxes[i]);
        }
    };

    CheckboxToInput.prototype.attachListeners = function (checkbox) {
        checkbox.addEventListener('click', this.__onClick);
        checkbox.addEventListener('touchstart', this.__onClick);
    };

    CheckboxToInput.prototype.detachListeners = function (checkbox) {
        checkbox.removeEventListener('click', this.__onClick);
        checkbox.removeEventListener('touchstart', this.__onClick);
    };

    CheckboxToInput.prototype.deselectCheckbox = function (checkbox) {
        checkbox.classList.remove('chk-selected');
    };

    CheckboxToInput.prototype.selectCheckbox = function (checkbox) {
        checkbox.classList.add('chk-selected');
    };

    CheckboxToInput.prototype.targetIsCheckbox = function (checkbox, target) {
        return (target === checkbox) ? true : checkbox.contains(target);
    };

    CheckboxToInput.prototype.onCheckboxClick = function (e) {
        var target = e.target;
        this.loopTroughCheckboxes('deselectCheckbox');

        for (var i = 0, checkboxes = this.checkboxes, ln = checkboxes.length; i < ln; i++) {
            if (this.targetIsCheckbox(checkboxes[i], target)) {
                this.inputTarget.value = checkboxes[i].getAttribute('data-value');
                this.selectCheckbox(checkboxes[i]);
            }
        }
    };

    CheckboxToInput.prototype.destroy = function () {
        this.loopTroughCheckboxes('detachListeners');
        this.checboxes = null;
        this.inputTarget = null;
    };

    window['CheckboxToInput'] = CheckboxToInput;
})();

/**
 * @param {object} config
 * @param {DOMElement[]} config.checkboxes
 * @param {DOMElement} config.inputTarget
 */

//--------------------------------------------TEST---------------------------------
//
// <div class="chk" data-value="x">
// X
// </div>
// <div class="chk" data-value="y">
// Y
// </div>
// <div class="chk" data-value="zdfasdfd">
//   <div>
//    <div>
//    test when child
//   </div>
//   </div>
// </div>
//
// <input type="text" >
// new CheckboxToInput({
//     checkboxes: document.querySelectorAll('.chk'),
//     target: document.querySelector('[type="text"]')
// });
