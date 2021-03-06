/**
 * Created by body7 on 10/21/15.
 */



(function () {
    'use strict';
    angular.module('myApp')
        .controller('merchantsController', ['$scope','DataService',function($scope, DataService){

            $scope.list = {};
            var page = 0;
            var pageSize = 100;
            //$scope.GetProductList = GetProductList;
            DataService.AdminGetMerchantList(page, pageSize, function(response){
                if (response.success) {
                    $scope.list = response.data.list;
                }
            });
            $scope.statusList = {
                "-1": "已删除",
                "0": "未审批",
                "1":"已通过",
                "9":"信息未完成"
            };

            $scope.methodList = {
                "-1": "恢复",
                "0": "通过",
                "1":"拉黑",
                "9":"请通知商家完善信息"
            };
            $scope.functionList = {
                "-1": function(merchant_id){
                    DataService.AdminAuditMerchant(merchant_id, 1, function(response){
                        if(response.success){
                            alert("恢复成功");
                            DataService.AdminGetMerchantList(page, pageSize, function(response){
                                if (response.success) {
                                    $scope.list = response.data.list;
                                }
                            });
                        }else{
                            alert("恢复失败");
                        }
                    });
                },
                "0": function(merchant_id){
                    DataService.AdminAuditMerchant(merchant_id, 1, function(response){
                        if(response.success){
                            alert("通过成功");
                            DataService.AdminGetMerchantList(page, pageSize, function(response){
                                if (response.success) {
                                    $scope.list = response.data.list;
                                }
                            });
                        }else{
                            alert("通过失败");
                        }
                    });
                },
                "1":function(merchant_id){
                    DataService.AdminAuditMerchant(merchant_id, -1, function(response){
                        if(response.success){
                            alert("拉黑成功");
                            DataService.AdminGetMerchantList(page, pageSize, function(response){
                                if (response.success) {
                                    $scope.list = response.data.list;
                                }
                            });
                        }else{
                            alert("拉黑失败");
                        }
                    });
                },
                "9":function(merchant_id){
                    alert("请管理员通知商家完善信息");
                }
            };

        }]);
})();