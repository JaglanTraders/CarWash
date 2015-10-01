(function () {
  'use strict';
	console.log("helloo");
	describe("A suite", function() {
		console.log("helloo1");
		it("contains spec with an expectation", function() {
			console.log("helloo2");
			//expect(false).toBe(true);
			expect('test').toEqual("Hello world!");
		});
	});
})();
