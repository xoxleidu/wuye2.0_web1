<template>
  <div id="Demo" style="height:100%">
    <el-form ref="form" label-width="100px">
      <el-form-item label="首页">
        <div>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="permission1.checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
        </div>
        <el-checkbox-group
          v-model="permission1.checkAll"
          v-for="p in permission1"
          :key="p.permissionId"
          @change="handleCheckedCitiesChange"
        >
          <el-tag class="checkboxTitle">{{p.name}}</el-tag>
          <el-checkbox v-for="v in p.children" :label="v.name" :key="v.permissionId" @change="handleCheckedCitiesChangeChange">{{v.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkedPermission: [],
      isIndeterminate: true,
      permission1: [
        {
          permissionId: 1,
          parentId: 0,
          name: "首页",
          children: [
            {
              permissionId: 2,
              parentId: 1,
              name: "首页业务"
            },
            {
              permissionId: 3,
              parentId: 1,
              name: "首页财务"
            }
          ]
        }
      ],
      permission2: [
        {
          permissionId: 4,
          parentId: 0,
          name: "信息查询",
          children: [
            {
              permissionId: 5,
              parentId: 4,
              name: "物产信息查询"
            },
            {
              permissionId: 6,
              parentId: 4,
              name: "导出"
            }
          ]
        }
      ],
      permission3: [
        {
          permissionId: 7,
          parentId: 0,
          name: "费用办理",
          children: [
            {
              permissionId: 8,
              parentId: 7,
              name: "查看"
            },
            {
              permissionId: 9,
              parentId: 7,
              name: "办理"
            },
            {
              permissionId: 10,
              parentId: 7,
              name: "优惠"
            }
          ]
        }
      ],
      permission4: [
        {
          permissionId: 11,
          parentId: 0,
          name: "缴费票据",
          children: [
            {
              permissionId: 12,
              parentId: 11,
              name: "查看"
            },
            {
              permissionId: 13,
              parentId: 11,
              name: "导出"
            },
            {
              permissionId: 14,
              parentId: 11,
              name: "办理"
            }
          ]
        },
        {
          permissionId: 15,
          parentId: 0,
          name: "退费票据",
          children: [
            {
              permissionId: 12,
              parentId: 16,
              name: "查看"
            },
            {
              permissionId: 13,
              parentId: 17,
              name: "导出"
            },
            {
              permissionId: 14,
              parentId: 18,
              name: "办理"
            }
          ]
        },
        {
          permissionId: 19,
          parentId: 0,
          name: "扣费记录",
          children: [
            {
              permissionId: 20,
              parentId: 19,
              name: "查看"
            },
            {
              permissionId: 21,
              parentId: 19,
              name: "导出"
            },
            {
              permissionId: 22,
              parentId: 19,
              name: "作废"
            }
          ]
        },
        {
          permissionId: 23,
          parentId: 0,
          name: "月耗电量统计报表",
          children: [
            {
              permissionId: 24,
              parentId: 23,
              name: "查看"
            },
            {
              permissionId: 25,
              parentId: 23,
              name: "导出"
            }
          ]
        },
        {
          permissionId: 26,
          parentId: 0,
          name: "月报",
          children: [
            {
              permissionId: 27,
              parentId: 26,
              name: "查看"
            },
            {
              permissionId: 28,
              parentId: 26,
              name: "导出"
            }
          ]
        },
        {
          permissionId: 27,
          parentId: 0,
          name: "财务报表",
          children: [
            {
              permissionId: 28,
              parentId: 27,
              name: "查看"
            },
            {
              permissionId: 29,
              parentId: 27,
              name: "导出"
            },
            {
              permissionId: 30,
              parentId: 27,
              name: "生成凭证号"
            }
          ]
        },
        {
          permissionId: 33,
          parentId: 0,
          name: "财务汇总",
          children: [
            {
              permissionId: 34,
              parentId: 33,
              name: "查看"
            },
            {
              permissionId: 35,
              parentId: 33,
              name: "导出"
            }
          ]
        },
        {
          permissionId: 36,
          parentId: 0,
          name: "换票查询",
          children: [
            {
              permissionId: 37,
              parentId: 36,
              name: "查看"
            },
            {
              permissionId: 38,
              parentId: 36,
              name: "导出"
            }
          ]
        }
      ],
      permission5: [
        {
          permissionId: 39,
          parentId: 0,
          name: "物产信息管理",
          children: [
            {
              permissionId: 40,
              parentId: 39,
              name: "查看"
            },
            {
              permissionId: 41,
              parentId: 39,
              name: "管理"
            },
            {
              permissionId: 42,
              parentId: 39,
              name: "删除"
            },
            {
              permissionId: 43,
              parentId: 39,
              name: "导入"
            }
          ]
        },
        {
          permissionId: 44,
          parentId: 0,
          name: "收费项管理",
          children: [
            {
              permissionId: 45,
              parentId: 44,
              name: "查看"
            },
            {
              permissionId: 46,
              parentId: 44,
              name: "管理"
            },
            {
              permissionId: 47,
              parentId: 44,
              name: "删除"
            }
          ]
        },
        {
          permissionId: 48,
          parentId: 0,
          name: "规则管理",
          children: [
            {
              permissionId: 49,
              parentId: 48,
              name: "查看"
            },
            {
              permissionId: 50,
              parentId: 48,
              name: "管理"
            },
            {
              permissionId: 51,
              parentId: 48,
              name: "删除"
            }
          ]
        },
        {
          permissionId: 52,
          parentId: 0,
          name: "电表管理",
          children: [
            {
              permissionId: 53,
              parentId: 52,
              name: "查看"
            },
            {
              permissionId: 54,
              parentId: 52,
              name: "管理"
            },
            {
              permissionId: 55,
              parentId: 52,
              name: "删除"
            }
          ]
        },
        {
          permissionId: 56,
          parentId: 0,
          name: "支出管理",
          children: [
            {
              permissionId: 57,
              parentId: 56,
              name: "查看"
            },
            {
              permissionId: 58,
              parentId: 56,
              name: "管理"
            },
            {
              permissionId: 59,
              parentId: 56,
              name: "删除"
            }
          ]
        },
        {
          permissionId: 60,
          parentId: 0,
          name: "财务报表分组管理",
          children: [
            {
              permissionId: 61,
              parentId: 60,
              name: "查看"
            },
            {
              permissionId: 62,
              parentId: 60,
              name: "管理"
            },
            {
              permissionId: 63,
              parentId: 60,
              name: "删除"
            }
          ]
        }
      ],
      permission6: [
        {
          permissionId: 64,
          parentId: 0,
          name: "角色设置",
          children: [
            {
              permissionId: 65,
              parentId: 64,
              name: "查看"
            },
            {
              permissionId: 66,
              parentId: 64,
              name: "审核"
            }
          ]
        },
        {
          permissionId: 67,
          parentId: 0,
          name: "用户设置",
          children: [
            {
              permissionId: 68,
              parentId: 67,
              name: "查看"
            }
          ]
        },
        {
          permissionId: 69,
          parentId: 0,
          name: "个人信息",
          children: [
            {
              permissionId: 70,
              parentId: 69,
              name: "查看"
            }
          ]
        },
        {
          permissionId: 71,
          parentId: 0,
          name: "数据字典",
          children: [
            {
              permissionId: 72,
              parentId: 71,
              name: "查看"
            },
            {
              permissionId: 73,
              parentId: 71,
              name: "修改"
            }
          ]
        },
        {
          permissionId: 74,
          parentId: 0,
          name: "操作日志",
          children: [
            {
              permissionId: 75,
              parentId: 74,
              name: "查看"
            }
          ]
        }
      ],
      permission7: [
        {
          permissionId: 76,
          parentId: 0,
          name: "H/L",
          children: [
            {
              permissionId: 77,
              parentId: 76,
              name: "显示"
            }
          ]
        },
        {
          permissionId: 78,
          parentId: 0,
          name: "提醒",
          children: [
            {
              permissionId: 79,
              parentId: 78,
              name: "查看"
            }
          ]
        }
      ],

      checkEquip: []
    };
  },
  methods: {
    handleCheckAllChange(val) {
      console.log(val);
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
    }
  }
};
</script>
<style>
.checkboxTitle {
  border: none;
  background: none;
  padding-right: 20px;
}
</style>

