(function(angular, undefined) {
  angular.module("petz.env", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"admin"
	]
})

.constant("api", {
	"domain": "http://localhost:8080",
	"CLIENT_ID": "majimenatestapp",
	"CLIENT_SECRET": "mySecretOAuthSecret"
})

;
})(angular);