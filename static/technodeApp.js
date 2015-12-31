angular.module('technodeApp',['ngRoute']).run(function($window,$rootScope,$http,$location){
	$http({
		url:'/api/validate',
		method:'GET',
	}).success(function(user){
		$rootscope.me = user
		$location.path('/')
	}).error(function(data){
		$location.path('login')
	})
	$rootScope.logout = function(){
		$http({
			url:'/ajax/logout',
			method:'GET',
		}).success(function(){
			$rootScope.me = null
			$location.path('/')
		})
	}
	$rootScope.$on('login',function(evt,me){
		$rootScope.me = me
	})
})










