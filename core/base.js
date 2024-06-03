/**
 * An array with stored all the data of the properties
 * to be defined for the different objects
 * @ignore
 */
const data = [
	{
		/**
		 * The built-in Object constructor.
		 * @global
		 * @namespace Object
		 */
		object: Object,
		properties: [
			{
				/**
				 * Make a non-referenced deep clone of an object.
				 *
				 * @function Object.clone
				 * @argument {Object} object
				 * @return {Object}
				 *
				 * @example Object.clone({a: {x: 'foo'}, b: 2});
				 */
				name: 'clone',
				value: function(object) {
					const clone = [];
					const cloned = new Map();
					function traverse(object, clone) {
						cloned.set(object, clone);
						for (let key in object)
							if (object.has(key))
								if (object[key] instanceof Object) {
									if (!cloned.has(object[key])) {
										clone[key] = [];
										traverse(object[key], clone[key]);
									}
									cloned.get(object)[key] = cloned.get(object[key]);
								} else
									cloned.get(object)[key] = object[key];
					}
					traverse(object, clone);
					return clone;
				},
			},
			{
				/**
				 * @summary Compare two objects by their enumerable properties.
				 * @description In detailed mode, if the comparison returns true, return an object with:
				 * value (the result of the comparison, always true when returned in the detailed object),
				 * reference (true if all the references of the second object point to the first) and
				 * deep (true if all circular reference in both objects point to the same place in theirselves).
				 *
				 * @function Object.compare
				 * @argument {Object} object1
				 * @argument {Object} object2
				 * @argument {boolean} [detailed=false]
				 * @return {boolean|Object}
				 *
				 * @example Object.compare({ a: 1, b: 2 }, { b: 2, a: 1 }); // true
				 * @example Object.compare({ a: 1, b: 2 }, { x: 'hi' }); // false
				 * @example
				 * const o = {}, t = {}; o.a = o; t.a = t;
				 * Object.compare(o, t, true); // {value: true, reference: false, deep: true}
				 */
				name: 'compare',
				value: function(object1, object2, detailed = false) {
					const compared = new Map();
					let comparison = {
						value: true,
						reference: true,
						deep: true,
					};
					function traverse(object1, object2) {
						if (object1 instanceof Object === object2 instanceof Object) {
							if (object1 instanceof Object) {
								if (compared.has(object1)) {
									if (object1 === object2)
										comparison.deep = false;
									else {
										comparison.reference = false;
										comparison.value &= object2 === compared.get(object1);
									}
								} else {
									compared.set(object1, object2);
									for (let key in object1)
										if (object1.has(key) && object2.has(key))
											traverse(object1[key], object2[key]);
									else
										comparison.value = false;
								}
							} else
								comparison.value &= object1 === object2;
						} else
							comparison.value = false;
					}
					traverse(object1, object2);
					traverse(object2, object1);
					comparison.value = !!comparison.value;
					return detailed ? comparison.value ? comparison : false : comparison.value;
				},
			},
			{
				/**
				 * Check if an object contains any circular reference.
				 *
				 * @function Object.isCyclic
				 * @argument {Object} object
				 * @return {boolean}
				 *
				 * @example Object.isCyclic({a: 1, b: 0}); // false
				 * @example const o = {}; o.a = o; Object.isCyclic(o); // true
				 * @example
				 * const o = {}, t = {a: o}; o.a = t;
				 * Object.isCyclic(o); // true
				 */
				name: 'isCyclic',
				value: function(object) {
					const checked = [];
					function check(object) {
						if (object instanceof Object) {
							if (checked.indexOf(object) !== -1)
								return true;
							checked.push(object);
							for (let key in object)
								if (object.has(key))
									return check(object[key]);
						}
						return false;
					}
					return check(object);
				},
			},
			{
				/**
				 * @function Object.isCyclical
				 * @deprecated use {@link Object.isCyclic} instead.
				 */
				name: 'isCyclical',
				value: function(object) {
					return Object.isCyclic(object);
				},
			},
		],
	},
	{
		/**
		 * Any instance of {@link Object}.
		 * @namespace Object&period;prototype
		 */
		object: Object.prototype,
		properties: [
			{
				/**
				 * Return a non-referenced deep clone of this object.
				 *
				 * @function Object&period;prototype#clone
				 * @return {Object}
				 *
				 * @example {a: {x: 'foo'}, b: 2}.clone();
				 */
				name: 'clone',
				value: function() {
					return Object.clone(this);
				},
			},
			{
				/**
				 * @summary Compare this to an object by its enumerable properties.
				 * @description In detailed mode, if the comparison returns true, return an object with:
				 * value (the result of the comparison, always true when returned in the detailed object),
				 * reference (true if all the references of the compared object point to this object) and
				 * deep (true if all circular reference in both objects point to the same place in theirselves).
				 *
				 * @function Object&period;prototype#compare
				 * @argument {Object} object the object to compare this object to
				 * @argument {boolean} [detailed=false]
				 * @return {boolean|Object}
				 *
				 * @example { a: 1, b: 2 }.compare({ b: 2, a: 1 }); // true
				 * @example { a: 1, b: 2 }.compare({ x: 'hi' }); // false
				 * @example
				 * const o = {}, t = {}; o.a = o; t.a = t;
				 * o.compare(t, true); // {value: true, reference: false, deep: true}
				 */
				name: 'compare',
				value: function(object, detailed = false) {
					return Object.compare(this, object, detailed);
				},
			},
			{
				/**
				 * Check if this object has the specified key.
				 *
				 * @function Object&period;prototype#has
				 * @argument {String|Symbol} key
				 * @return {boolean}
				 *
				 * @example {a: 1, b: 2}.has('a'); // true
				 * @example {a: 1, b: 2}.has('c'); // false
				 */
				name: 'has',
				value: function(key) {
					return this.hasOwn ? this.hasOwn(key) : Object.prototype.hasOwnProperty.call(this, key);
				},
			},
		],
	},
	{
		/**
		 * The built-in Array constructor.
		 * @global
		 * @namespace Array
		 */
		object: Array,
		properties: [
			{
				/**
				 * @summary Make a non-referenced deep clone of an array.
				 * @description If the array contains non-array objects,
				 * the reference to them will be shared with the clone.
				 * To avoid this behaviour, use Object.clone() instead.
				 *
				 * @function Array.clone
				 * @argument {Array} array
				 * @return {Array}
				 *
				 * @example Array.clone([[1, 0], 2]);
				 */
				name: 'clone',
				value: function(array) {
					const clone = [];
					const cloned = new Map();
					function traverse(array, clone) {
						cloned.set(array, clone);
						for (let key in array)
							if (array.has(key))
								if (array[key] instanceof Array) {
									if (!cloned.has(array[key])) {
										clone[key] = [];
										traverse(array[key], clone[key]);
									}
									cloned.get(array)[key] = cloned.get(array[key]);
								} else
									cloned.get(array)[key] = array[key];
					}
					traverse(array, clone);
					return clone;
				},
			},
		],
	},
	{
		/**
		 * Any instance of {@link Array}.
		 * @namespace Array&period;prototype
		 */
		object: Array.prototype,
		properties: [
			{
				/**
				 * @summary Return a non-referenced deep clone of this array.
				 * @description If the array contains non-array objects, the reference to them will be shared.
				 * To avoid this behaviour, use Object.clone(this) instead.
				 *
				 * @function Array&period;prototype#clone
				 * @return {Array}
				 *
				 * @example [[1, 0], 2].clone();
				 */
				name: 'clone',
				value: function() {
					return Array.clone(this);
				},
			},
			{
				/**
				 * Removes the first occurency of an element from an array
				 * and returns its index or -1.
				 *
				 * @function Array&period;prototype#pull
				 * @argument {*} element
				 * @return {number}
				 *
				 * @example [1, 2, 1].pull(1); // 0
				 * @example [1, 2].pull(0); // -1
				 */
				name: 'pull',
				value: function(element) {
					const index = this.indexOf(element);
					if (index > -1)
						this.splice(index, 1);
					return index;
				},
			},
			{
				/**
				 * Pushes an item to an array, only if it does not already exist in the array.
				 *
				 * @function Array&period;prototype#pushUnique
				 * @argument {*} element
				 * @return {Boolean}
				 *
				 * @example [0, 1].pushUnique(2); // true
				 * @example [0, 1].pushUnique(0); // false
				 */
				name: 'pushUnique',
				value: function(element) {
					if (this.indexOf(element) !== -1)
						return false;
					this.push(element);
					return true;
				},
			},
		],
	},
	{
		/**
		 * The built-in Math object.
		 * @global
		 * @namespace Math
		 */
		object: Math,
		properties: [
			{
				/**
				 * Store a pre-calculated PI / 180 value.
				 *
				 * @constant Math#PI180
				 * @type {number}
				 */
				name: 'PI180',
				value: Math.PI / 180,
			},
			{
				/**
				 * @summary Clamp the value to within the min and max.
				 * @description If min > max, then their values are automatically swapped.
				 *
				 * @function Math#clamp
				 * @argument {number} value
				 * @argument {number} min
				 * @argument {number} max
				 * @return {number}
				 *
				 * @example Math.clamp(3, 4, 5); // 4
				 * @example Math.clamp(5, 0, 10); // 5
				 */
				name: 'clamp',
				value: function(value, min, max) {
					[min, max,] = [min, max,].sort();
					return Math.min(Math.max(value, min), max);
				},
			},
			{
				/**
				 * Convert radians to degrees.
				 *
				 * @function Math#degrees
				 * @argument {number} radians
				 * @return {number}
				 *
				 * @example Math.degrees(1); // 57.29577951308232
				 */
				name: 'degrees',
				value: function(radians) {
					return radians / Math.PI180;
				},
			},
			{
				/**
				 * Calculate the distance from the first point to the second point.
				 *
				 * @function Math#distance
				 * @argument {Number[]} x the coordinates of the first point
				 * @argument {Number[]} y the coordinates of the second point
				 * @exception {TypeError} Both arguments must be arrays.
				 * @exception {Error} Both points must have the same number of coordinates.
				 * @return {number}
				 *
				 * @example Math.distance([1, 2], [4, 6]); // 5
				 * @example Math.distance([8, 1, 2], [-4, 4, 6]); // 13
				 * @example Math.distance(1, [4, 6]); // TypeError: Both arguments must be arrays
				 * @example
				 * Math.distance([1, 2, 3, 4], [4, 6]);
				 * // Error: Both points must have the same number of coordinates
				 */
				name: 'distance',
				value: function(a, b) {
					if (!(a instanceof Array) || !(b instanceof Array))
						throw new TypeError('Both arguments must be arrays');
					if (a.length !== b.length)
						throw new Error('Both points must have the same number of coordinates');
					return Math.sqrt(Math.sum(...a.map((element, index) => Math.pow(a[index] - b[index], 2))));
				},
			},
			{
				/**
				 * Return the product of the given arguments.
				 *
				 * @function Math#prod
				 * @argument {...number} factors
				 * @return {number}
				 *
				 * @example Math.prod(1, 2, 3, 4); // 24
				 */
				name: 'prod',
				value: function(...factors) {
					return factors.reduce((a, b) => a * b);
				},
			},
			{
				/**
				 * Convert degrees to radians.
				 *
				 * @function Math#radians
				 * @argument {number} degrees
				 * @return {number}
				 *
				 * @example Math.radians(90); // 1.5707963267948966
				 */
				name: 'radians',
				value: function(degrees) {
					return degrees * Math.PI180;
				},
			},
			{
				/**
				 * @summary Return a random integer in the specified range.
				 * @description If min > max, then their values are automatically swapped.
				 *
				 * @function Math#randomInt
				 * @argument {number} [min=0]
				 * @argument {number} max
				 * @return {number}
				 *
				 * @example Math.randomInt(4, 6);
				 */
				name: 'randomInt',
				value: function(min, max = 0) {
					[min, max,] = [min, max,].sort();
					min = Math.ceil(min);
					max = Math.floor(max);
					return Math.floor(Math.random() * (max - min + 1)) + min;
				},
			},
			{
				/**
				 * Return the sum of the given arguments.
				 *
				 * @function Math#sum
				 * @argument {...number} addends
				 * @return {number}
				 *
				 * @example Math.sum(1, 2, 3, 4); // 10
				 */
				name: 'sum',
				value: function(...addends) {
					return addends.reduce((a, b) => a + b);
				},
			},
		],
	},
];

/** Add the indexOf method to all array objects if it does not already exist */
if (!Array.prototype.indexOf) {
	data.push({
		object: Array.prototype,
		properties: [
			{
				/**
				 * Get the index of the first occurency of an element in this array.
				 *
				 * @function Array&period;prototype#indexOf
				 * @argument {*} element the element to find the index of
				 * @return {number} The index of the passed element, or -1 if not found.
				 *
				 * @example ['a', 'k', 'x'].indexOf('x'); // 2
				 * @example ['a', 'k', 'x'].indexOf('b'); // -1
				 */
				name: 'indexOf',
				value: function(element) {
					for (let index = 0; index < this.length; index++)
						if (this[index] === element)
							return index;
					return -1;
				},
			},
		],
	});
}

/** If CanvasRenderingContext2D is not found, try to import it */
try {
	if (typeof CanvasRenderingContext2D === 'undefined')
		({
			CanvasRenderingContext2D,
		} = require('canvas'));
} finally {
	/** Extend the canvas context CanvasRenderingContext2D with some helper methods */
	if (typeof CanvasRenderingContext2D !== 'undefined')
		data.push({
			/**
			 * The CanvasRenderingContext2D interface, part of the Canvas API.
			 * @global
			 * @namespace CanvasRenderingContext2D
			 */
			object: CanvasRenderingContext2D,
			properties: [
				{
					/**
					 * Add a circle to the current path.
					 *
					 * @function CanvasRenderingContext2D#circle
					 * @argument {number} cx the x coordinate of the center
					 * @argument {number} cy the y coordinate of the center
					 * @argument {number} radius the radius of the circle
					 *
					 * @example
					 * CanvasRenderingContext2D.beginPath();
					 * CanvasRenderingContext2D.circle();
					 * CanvasRenderingContext2D.stroke();
					 */
					name: 'circle',
					value: function(cx, cy, radius) {
						this.arc(cx, cy, radius, 0, 2 * Math.PI, false);
					},
				},
			],
		});
}

/** Loop through the data array */
for (let item of data) {
	for (let property of item.properties) {
		/** Make property non-enumerable */
		Object.defineProperty(item.object, property.name, {
			enumerable: false,
			writable: true,
			configurable: true,
		});
		/** Assign the property of the object to its value */
		item.object[property.name] = property.value;
	}
}

/** Check console and eventually fix */
if (typeof console === 'object') {
	if (typeof console.log === 'function') {
		if (!console.info)
			console.info = console.log;
		if (!console.warn)
			console.warn = console.log;
		if (!console.error)
			console.error = console.log;
	}
} else
	/** Create dummy console */
	/* eslint-disable-next-line */
	console = {
		log() {},
		info() {},
		warn() {},
		error() {},
	};
