define({
  type: "service",
  definition: [
    function () {

      var _anim = {
        step: 0,
        dir: 1,
        elements: [],
        dstElements: [],
        src: [],
        dst: []
      };

      var requestAnimFrame = (function () {
        return  window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function (callback) {
             window.setTimeout(callback, 1000 / 60);
           };
      })();

      function getCoordinates(element) {
        if (element) {
          return {
            x: element.offsetLeft,
            y: element.offsetTop
          };
        }
        return {x: -1, y: -1};
      }

      function convertToAbsolute(element, x, y) {
        if (element) {
          element.style.position = 'absolute';
          element.style.left = x + 'px';
          element.style.top = y + 'px';
        }
      }

      function shiftElementPosition(elementIndex, animStep) {
        if (0 <= elementIndex && elementIndex < _anim.elements.length) {
          var src = _anim.src;
          var dst = _anim.dst;
          var a = (Math.cos(Math.PI * animStep / 30) + 1) / 2;
          var z = 1 - a;
          var x = src[elementIndex].x * a + dst[elementIndex].x * z;
          var y = src[elementIndex].y * a + dst[elementIndex].y * z;
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
          _anim.elements.push(item);
          _anim.src.push(getCoordinates(item));
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
          _anim.dir *= -1;
          updateElementPositions();
        }
        animateSingleFrame();
        requestAnimFrame(_animate);
      };

      this.prepare = function () {
        for (var i = 0; i < _anim.elements.length; i++) {
          var e = _anim.elements[i];
          var x = _anim.src[i].x;
          var y = _anim.src[i].y;
          convertToAbsolute(e, x, y);
        }
      };

      this.animate = _animate;

      return this;
    }
  ]
});


