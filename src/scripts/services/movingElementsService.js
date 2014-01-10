define({
  type: "service",
  definition: [
    function () {

      function _Anim() {
        this.step = 0;
        this.dir = 1;
        this.elements = [];
        this.srcElements = [];
        this.dstElements = [];
        this.src = [];
        this.dst = [];
        this.doneCallback = function () {
        };
      }

      var _anim = new _Anim();

      function getCoordinates(element) {
        if (element) {
          return {
            x: element.offsetLeft,
            y: element.offsetTop
          };
        }
        return {x: -1, y: -1};
      }

      function cloneAbsoluteAndHide(element, x, y) {
        if (element) {
          var clone = element.cloneNode(true);
          clone.style.position = 'absolute';
          clone.style.left = x + 'px';
          clone.style.top = y + 'px';
          element.style.opacity = 0;
          element.parentNode.appendChild(clone);
          return clone;
        }
        return element;
      }

      function shiftElementPosition(elementIndex, animStep) {
        if (0 <= elementIndex && elementIndex < _anim.elements.length) {
          var src = _anim.src;
          var dst = _anim.dst;
          var a = (Math.cos(Math.PI * animStep / 30) + 1) / 2;
          var z = 1 - a;
          var x =  (dst[elementIndex].x - src[elementIndex].x + _anim.dstElements[elementIndex].offsetParent.offsetLeft - _anim.srcElements[elementIndex].offsetParent.offsetLeft) * z;
          var y =  (dst[elementIndex].y - src[elementIndex].y + _anim.dstElements[elementIndex].offsetParent.offsetTop - _anim.srcElements[elementIndex].offsetParent.offsetTop) * z;
          var e = _anim.elements[elementIndex];
          e.style.left = x + 'px';
          e.style.top = y + 'px';
        }
      }

      function animateSingleFrame() {
        var len = _anim.elements.length;
        var step = _anim.step;
        for (var i = 0; i < 30; i++) {
          var offs = step - i;
          if (0 <= offs && offs <= (len / 4)) {
            for (var r = 0; r < len; r += (len / 2)) {
              var idx = (offs + r) | 0;
              shiftElementPosition(idx, i);
              idx = (len / 2 + r - offs) | 0;
              shiftElementPosition(idx, i);
            }
          }
        }
      }

      function updateElementPositions() {
        var elements = _anim.dstElements;
        for (var i = 0, len = elements.length; i < len; i++) {
          _anim.dst[i] = getCoordinates(elements[i]);
        }
      }

      // *** Public methods ****************************************

      this.addSourceElements = function (elements) {
        for (var i = 0; i < elements.length; i++) {
          var item = elements[i];
          _anim.src.push(getCoordinates(item));
          _anim.srcElements.push(item);
        }
      };

      this.addDestinationElements = function (elements) {
        for (var i = 0; i < elements.length; i++) {
          var item = elements[i];
          _anim.dst.push(getCoordinates(item));
          _anim.dstElements.push(item);
        }
      };

      var _animate = function () {
        _anim.step += _anim.dir;
        if (!(0 < _anim.step && _anim.step < (30 + _anim.elements.length / 4))) {
//          _anim.dir *= -1;
          updateElementPositions();
          _anim.doneCallback();
          return;
        }
        animateSingleFrame();
        requestAnimationFrame(_animate);
      };

      this.prepare = function () {
        _anim.elements = _anim.srcElements;
        for (var i = 0; i < _anim.dstElements.length; i++) {
          _anim.dstElements[i].style.opacity = 0;
        }
      };

      this.cleanup = function () {
//        for (var i = 0; i < _anim.elements.length; i++) {
//          var parent = _anim.elements[i].parentNode;
//          parent.removeChild(_anim.elements[i]);
//        }
        _anim = new _Anim();
      }


      this.animate = _animate;
      this.setDoneCallback = function (doneCallback) {
        _anim.doneCallback = doneCallback;
      }

      return this;
    }
  ]
});


