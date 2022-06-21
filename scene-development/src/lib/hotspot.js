export var scale = 1
export var objCurrent = null
export var objPrevious = null
export var arTargets = []

export const updateScale = ((updatedScale) => {
	scale = updatedScale;
});

export const setObjCurrent = (object) => {
	objCurrent = object;
}

export const start = ((objEvent, target) => {
	objCurrent = target;

	objCurrent.lastX = (objEvent.clientX / scale);
	objCurrent.lastY = (objEvent.clientY / scale);
	objCurrent.lastRotation = 0;
	objCurrent.isAnimated = false;
	objCurrent.setAttribute( 'style', 'z-index: 99 !important; transform:' + objCurrent.style.transform +';' );
	objCurrent.setAttribute('aria-grabbed', 'true');

	return false;
});

export const customScaledStart = ((objEvent, target, customscale) => {
	objCurrent = target;

	objCurrent.lastX = (objEvent.clientX / customscale);
	objCurrent.lastY = (objEvent.clientY / customscale);
	objCurrent.lastRotation = 0;
	objCurrent.isAnimated = false;
	objCurrent.style.zIndex = '99';
	objCurrent.setAttribute('aria-grabbed', 'true');

	return false;
});

export const unscaledStart = ((objEvent, target) => {
	objCurrent = target;

	objCurrent.lastX = (objEvent.clientX);
	objCurrent.lastY = (objEvent.clientY);
	objCurrent.lastRotation = 0;
	objCurrent.isAnimated = false;
	objCurrent.style.zIndex = '99';
	objCurrent.setAttribute('aria-grabbed', 'true');

	return false;
});

export const end = ((e) => {
	// Set the current active element to null
	if (objCurrent !== null) {
		objCurrent.style.zIndex = '2';
		objCurrent.setAttribute('aria-grabbed', 'false');
		if (objPrevious !== null && objPrevious !== objCurrent) {
			objPrevious.style.zIndex = "";
		}
		objPrevious = objCurrent;
	}
	objCurrent = null;

	return false;
});



export const getTransform = ((elem) => {
	var matrix = getComputedStyle(elem, null).transform;

	var regex = /-?\d*\.{0,1}\d+/g;
	var values = matrix.match(regex);

	var translateX = '';
	var translateY = '';

	if (values !== null) {
		translateX = values[4];
		translateY = values[5];
	}

	return {
		'translateX': translateX,
		'translateY': translateY
	};
});

export const drag = ((objEvent) => {
	if (objCurrent !== null) {

		// Calculate new position
		var iCurrentY = (objEvent.clientY / scale);
		var iCurrentX = (objEvent.clientX / scale);

		var transform = getTransform(objCurrent);

		var iYPos = parseFloat(transform.translateY);
		var iXPos = parseFloat(transform.translateX);

		var iNewX = iXPos + iCurrentX - objCurrent.lastX;
		var iNewY = iYPos + iCurrentY - objCurrent.lastY;

		var velocity = (iCurrentX - objCurrent.lastX) * 3;
		var rotation = parseInt(velocity * 100 / 360, 10);
		var rotate = 0;

		if(velocity !== 0){
			rotate = rotation;
		} else {
			rotate = objCurrent.lastRotation;
		}

		objCurrent.style.transform = 'translate3d(' + iNewX + 'px, ' + iNewY + 'px, 0px) rotateZ(' + rotate + 'deg) ';

		objCurrent.lastX = iCurrentX;
		objCurrent.lastY = iCurrentY;
		objCurrent.lastRotation = rotation;
		objCurrent.isAnimated = false;
	}
	return false;
});


export const unscaledDrag = ((objEvent) => {
	if (objCurrent !== null) {

		// Calculate new position
		var iCurrentY = (objEvent.clientY);
		var iCurrentX = (objEvent.clientX);

		var transform = getTransform(objCurrent);

		var iYPos = parseFloat(transform.translateY);
		var iXPos = parseFloat(transform.translateX);

		var iNewX = iXPos + iCurrentX - objCurrent.lastX;
		var iNewY = iYPos + iCurrentY - objCurrent.lastY;

		// var velocity = (iCurrentX - objCurrent.lastX) * 3;
		// var rotation = parseInt(velocity * 100 / 360, 10);
		var rotation = 0;
		var rotate = 0;

		// if(velocity !== 0){
		// 	rotate = rotation;
		// } else {
		// 	rotate = objCurrent.lastRotation;
		// }

		objCurrent.style.transform = 'translate3d(' + iNewX + 'px, ' + iNewY + 'px, 0px) rotateZ(' + rotate + 'deg) ';

		objCurrent.lastX = iCurrentX;
		objCurrent.lastY = iCurrentY;
		objCurrent.lastRotation = rotation;
		objCurrent.isAnimated = false;
	}
	return false;
});

export const customScaledDrag = ((objEvent, customscale) => {
	if (objCurrent !== null) {

		// Calculate new position
		var iCurrentY = (objEvent.clientY / customscale);
		var iCurrentX = (objEvent.clientX / customscale);

		var transform = getTransform(objCurrent);

		var iYPos = parseFloat(transform.translateY);
		var iXPos = parseFloat(transform.translateX);

		var iNewX = iXPos + iCurrentX - objCurrent.lastX;
		var iNewY = iYPos + iCurrentY - objCurrent.lastY;

		// var velocity = (iCurrentX - objCurrent.lastX) * 3;
		// var rotation = parseInt(velocity * 100 / 360, 10);
		var rotation = 0;
		var rotate = 0;

		// if(velocity !== 0){
		// 	rotate = rotation;
		// } else {
		// 	rotate = objCurrent.lastRotation;
		// }

		objCurrent.style.transform = 'translate3d(' + iNewX + 'px, ' + iNewY + 'px, 0px) rotateZ(' + rotate + 'deg) ';

		objCurrent.lastX = iCurrentX;
		objCurrent.lastY = iCurrentY;
		objCurrent.lastRotation = rotation;
		objCurrent.isAnimated = false;
	}
	return false;
});



export const teleport = ((objCurrent, targetData) => {
	//targetData = {left, top, elem}
	if (objCurrent != null) {

		const objPos = objCurrent.parentNode.getBoundingClientRect();
		let finalX, finalY = null;

		if(objCurrent.id.includes('flask')){
			finalX = (targetData.left / scale) - (objPos.left / scale) + (targetData.width / 2) - (objPos.width / 2)
			finalY = (targetData.bottom / scale) - (objPos.bottom / scale) - (50 / scale)
		} else if(objCurrent.id.includes('PowerSupplyLead')){
			finalX = (targetData.left / scale) - (objPos.left / scale) + (targetData.width / 2) - (objPos.width / 2)
			finalY = (targetData.bottom / scale) - (objPos.bottom / scale) - (10 / scale)
		} else {
			finalX = (targetData.left / scale) - (objPos.left / scale) + (targetData.width / 2) - (objPos.width / 2)
			finalY = (targetData.bottom / scale) - (objPos.bottom / scale) - (25 / scale)
		}

	objCurrent.style.transform = 'translate3d(' + finalX + 'px, ' + finalY + 'px, 0px) rotateZ(0deg) ';
}
return false;
});


export const getTarget = ((current, targetList) => {

	let iCurrentXCenter, iCurrentYCenter;

	if (current !== null) {
		let offset =  calculatePosition(current);

		if(current.id === 'P2_1' || current.id === 'P20_2' || current.id === 'P200_3'|| current.id === 'P1000_4' ) {
			iCurrentXCenter = (offset.left / scale) + (current.parentNode.offsetWidth / 2);
			iCurrentYCenter = ((offset.top / scale) + (current.parentNode.offsetHeight / 2) + (100));
		} else {
			iCurrentXCenter = (offset.left / scale) + (current.parentNode.offsetWidth / 2);
			iCurrentYCenter = (offset.top / scale) + (current.parentNode.offsetHeight / 2);
		}

		var iTolerance = 70;
		var iLeft, iRight, iTop, iBottom, iCounter;

		//DEBUGGING CODE - UNCOMMENT TO DEBUG

		// console.log(current.id, iCurrentXCenter, iCurrentYCenter);

		// var tNode = document.createElement('div');
		// document.getElementById('dragdrop').appendChild(tNode);

		// tNode.className = current.id;
		// tNode.style.position = 'absolute';
		// tNode.style.left = iCurrentXCenter+'px';
		// tNode.style.top = iCurrentYCenter+'px';
		// tNode.style.width = 2+'px';
		// tNode.style.height = 2+'px';
		// tNode.style.border = '3px solid green';

		//END OF DEBUGGING CODE - UNCOMMENT TO DEBUG

		for (iCounter = 0; iCounter < targetList.length; iCounter++) {

			if(current.id !== targetList[iCounter].id) {
				offset = calculatePosition(targetList[iCounter]);

				iLeft = (offset.left) / scale;
				iRight = (iLeft + targetList[iCounter].offsetWidth);
				iTop = (offset.top) / scale;
				iBottom = (iTop + targetList[iCounter].offsetHeight);


				//DEBUGGING CODE - UNCOMMENT TO DEBUG

				// var node = document.createElement('div');
				// document.getElementById('dragdrop').appendChild(node);

				// node.className = targetList[iCounter].id;
				// node.style.position = 'absolute';
				// node.style.left = iLeft+'px';
				// node.style.top = iTop+'px';
				// node.style.width = (iRight - iLeft)+'px';
				// node.style.height = (iBottom - iTop)+'px';
				// node.style.border = '3px solid red';
				//
				//
				// console.log("Pipette: x: ", iCurrentXCenter," y: ",iCurrentYCenter);
				// console.log("target: ",iLeft," ",iRight," ",iBottom," ",iTop);

				//END OF DEBUGGING CODE - UNCOMMENT TO DEBUG

				// Determine if current object is over the target
				if (iCurrentXCenter > iLeft && iCurrentXCenter < iRight && iCurrentYCenter > iTop && iCurrentYCenter < iBottom) {
					return targetList[iCounter];
				}
			}
		}
	}
	// Current object is not over a target
	return '';
});

export const getZeroTarget = ((current, targetList) => {

	let iCurrentXCenter, iCurrentYCenter;

	if (current !== null) {

		let modalDiv = document.getElementsByClassName("modal-body")[0];
		let modalDivOffset = calculatePosition(modalDiv);

		let offset =  calculatePosition(current);

		iCurrentXCenter = (offset.left - modalDivOffset.left) + (current.offsetWidth / 2);
		iCurrentYCenter = (offset.top - modalDivOffset.top) + (current.offsetHeight / 2);

		var iTolerance = 0;
		var iLeft, iRight, iTop, iBottom, iCounter;

		//DEBUGGING CODE - UNCOMMENT TO DEBUG

		// console.log(current.id, iCurrentXCenter, iCurrentYCenter);

		// var tNode = document.createElement('div');
		// document.getElementsByClassName('modal-inner-heat-block-tubes')[0].appendChild(tNode);
		//
		// tNode.className = current.id;
		// tNode.style.position = 'absolute';
		// tNode.style.left = iCurrentXCenter+'px';
		// tNode.style.top = iCurrentYCenter+'px';
		// tNode.style.width = 2+'px';
		// tNode.style.height = 2+'px';
		// tNode.style.border = '3px solid green';

		//END OF DEBUGGING CODE - UNCOMMENT TO DEBUG

		for (iCounter = 0; iCounter < targetList.length; iCounter++) {

			if(current.id !== targetList[iCounter].id) {
				offset = calculatePosition(targetList[iCounter]);

				if(current.id == "dropArea"){

					iRight = (offset.right - modalDivOffset.right) / scale;
					iLeft = (iRight - targetList[iCounter].offsetWidth);
					iTop = (offset.top - modalDivOffset.top) / scale;
					iBottom = (iTop + targetList[iCounter].offsetHeight);

				} else {
					iLeft = (offset.left - modalDivOffset.left) / scale;
					iRight = (iLeft + targetList[iCounter].offsetWidth);
					iTop = (offset.top - modalDivOffset.top) / scale;
					iBottom = (iTop + targetList[iCounter].offsetHeight);
				}

				//DEBUGGING CODE - UNCOMMENT TO DEBUG

				// var node = document.createElement('div');
				// document.getElementsByClassName('modal-inner-heat-block-tubes')[0].appendChild(node);
				//
				// node.className = "id"+iCounter;
				// node.style.position = 'absolute';
				// node.style.left = iLeft+'px';
				// node.style.top = iTop+'px';
				// node.style.width = (iRight - iLeft)+'px';
				// node.style.height = (iBottom - iTop)+'px';
				// node.style.border = '3px solid red';
				//
				//
				// console.log("Pipette: x: ", iCurrentXCenter," y: ",iCurrentYCenter);
				// console.log("target: ",iLeft," ",iRight," ",iBottom," ",iTop);

				//END OF DEBUGGING CODE - UNCOMMENT TO DEBUG

				// Determine if current object is over the target
				if (iCurrentXCenter > iLeft && iCurrentXCenter < iRight && iCurrentYCenter > iTop && iCurrentYCenter < iBottom) {
					return targetList[iCounter];
				}
			}
		}
	}
	// Current object is not over a target
	return '';
});


export const getPointerTarget = ((cursor, targetList) => {

	console.log('cursor :: ', cursor);
	console.log('targetList :: ', targetList);

	if (cursor.clientX != null && cursor.clientY != null) {

		var iLeft, iRight, iTop, iBottom, iCounter;

		for (iCounter = 0; iCounter < targetList.length; iCounter++) {

			if(cursor.id != targetList[iCounter].id) {
				let offset = calculatePosition(targetList[iCounter]);

				iLeft = (offset.left);
				iRight = (iLeft + targetList[iCounter].offsetWidth);
				iTop = (offset.top);
				iBottom = (iTop + targetList[iCounter].offsetHeight);

				// Determine if cursor object is over the target
				if (cursor.clientX > iLeft && cursor.clientX < iRight && cursor.clientY > iTop && cursor.clientY < iBottom) {

					return targetList[iCounter];
				}
			}
		}
	}
	// Current object is not over a target
	return '';
});

export const getUnscaledTarget = ((current, targetList) => {

	if (current !== null) {
		var offset =  calculatePosition(current);

		var iCurrentXCenter = (offset.left) + (current.offsetWidth / 2);
		var iCurrentYCenter = (offset.top) + (current.offsetHeight / 2);

		var iLeft, iRight, iTop, iBottom, iCounter;

		for (iCounter = 0; iCounter < targetList.length; iCounter++) {

			if(current.id !== targetList[iCounter].id) {
				offset = calculatePosition(targetList[iCounter]);

				iLeft = (offset.left);
				iRight = (iLeft + targetList[iCounter].offsetWidth);
				iTop = (offset.top);
				iBottom = (iTop + targetList[iCounter].offsetHeight);

				// Determine if current object is over the target
				if (iCurrentXCenter > iLeft && iCurrentXCenter < iRight && iCurrentYCenter > iTop && iCurrentYCenter < iBottom) {
					return targetList[iCounter];
				}
			}
		}
	}
	// Current object is not over a target
	return '';
});

export const calculatePosition = ((objElement) => {
	const objPos = objElement.getBoundingClientRect();

	return objPos;
});


export const moveCalcPos = ((elem) => {
	var offset = {left: 0, top: 0};
	if (elem.offsetParent) {
		do {
			offset.left += parseFloat(elem.offsetLeft);
			offset.top  += parseFloat(elem.offsetTop);
			elem = elem.offsetParent;
		} while (elem.offsetParent)
	}
	return offset;
})
