import Utils from "./Utils";

import { _ } from "./Underscore";
import { Gestures } from "./Gestures";

let Events = {};

// Standard dom events
Events.MouseUp = "mouseup";
Events.MouseDown = "mousedown";
Events.MouseOver = "mouseover";
Events.MouseOut = "mouseout";
Events.MouseMove = "mousemove";
Events.MouseWheel = "mousewheel";
Events.DoubleClick = "dblclick";
Events.MouseDoubleClick = "dblclick"; // Alias for consistent naming

// Standard touch events
Events.enableEmulatedTouchEvents = function(enable) {
	if (enable == null) { enable = true; }
	if (enable) {
		Events.TouchStart = Events.MouseDown;
		Events.TouchEnd = Events.MouseUp;
		return Events.TouchMove = Events.MouseMove;
	} else {
		Events.TouchStart = "touchstart";
		Events.TouchEnd = "touchend";
		return Events.TouchMove = "touchmove";
	}
};

Events.enableEmulatedTouchEvents(false);

// Let's make sure the touch events work on desktop too
if (!Utils.isTouch()) {
	Events.enableEmulatedTouchEvents();
}

Events.Click = Events.TouchEnd;

// Animation events
Events.AnimationStart = "start";
Events.AnimationHalt = "halt";
Events.AnimationStop = "stop";
Events.AnimationEnd = "end";

Events.AnimationDidStart = Events.AnimationStart; // Deprecated
Events.AnimationDidStop = Events.AnimationStop; // Deprecated
Events.AnimationDidEnd = Events.AnimationEnd; // Deprecated

// State events
Events.StateSwitchStart = "stateswitchstart";
Events.StateSwitchStop = "stateswitchstop";
Events.StateSwitchEnd = "stateswitchend";

Events.StateWillSwitch = Events.StateSwitchStart; // Deprecated
Events.StateDidSwitch = Events.StateSwitchEnd; // Deprecated

// Scroll events
Events.Scroll = "scroll";

// Image events
Events.ImageLoaded = "imageload";
Events.ImageLoadError = "imageerror";
Events.ImageLoadCancelled = "imagecancelled";

// Add all gesture events
_.extend(Events, Gestures);

// Extract touch events for any event
Events.touchEvent = function(event) {
	let touchEvent =  event.touches != null ? event.touches[0] : undefined;
	if (touchEvent == null) { touchEvent = event.changedTouches != null ? event.changedTouches[0] : undefined; }
	if (touchEvent == null) { touchEvent = event; }
	return touchEvent;
};

Events.wrap = element => Framer.CurrentContext.domEventManager.wrap(element);

Events.isGesture = eventName => Array.from(Gestures).includes(eventName);

let interactiveEvents = _.values(Gestures).concat([
	Events.TouchStart,
	Events.TouchEnd,
	Events.MouseUp,
	Events.MouseDown,
	Events.MouseWheel,
	Events.DoubleClick
]);

Events.isInteractive = eventName => Array.from(interactiveEvents).includes(eventName);

export { Events };
