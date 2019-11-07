export const strict = false;
let wzUrl = 'https://wz.youpenglai.com/'
let fotoupUrl = 'http://fotoup.youpenglai.com'
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  wzUrl = 'https://wz.youpenglai.com/'
  fotoupUrl = 'http://fotoup.youpenglai.com'
} else if (process.env.NODE_ENV === 'prev') {
  wzUrl = 'http://wz2.youpenglai.com/'
  fotoupUrl = 'http://fotoup2.youpenglai.com'
} else if (process.env.NODE_ENV === 'development') {
  wzUrl = 'http://wz1.youpenglai.com/'
  fotoupUrl = 'http://fotoup1.youpenglai.com'
}
export const state = () => ({
  userInfo: {}, //  用户信息
  addAttendeeDialogVisible: false,  // 展示添加参数人模态框
  addAttendeeAttrDialogVisible: false,  // 展示添加参数人属性模态框
  meetingId: 8193,  // 会务id 8193 90113
  meetingBaseUrl: '/manage',  // Embiid 会务部分
  authBaseUrl: '/api/v1/auth/',  // Embiid 登录部分
  auth2BaseUrl: '/api/v1/oauth2/',  // Embiid 登录部分
  userBaseUrl: '/api/v1/user/',  // Embiid 用户部分
  apisBseUrl: '/apis/',  // Embiid 公共的oss ueditor
  signInBaseUrl: '/signapis/v3/sign/manage',  // 签到部分 jade
  depositBaseUrl: '/signapis/v2/deposit/',  // 签到部分 jade
  udiskBseUrl: '/v2/udisk',
  activityBaseUrl: '/activity/v1/',  //spark
  moduleSettingList: [],  // 模块设置
  defaultAvator: 'http://test-szw2.oss-cn-shanghai.aliyuncs.com/meeting/1/undefined20160725102949_2earM.jpeg',  // 默认头像
  defaultPoster: 'http://test-szw2.oss-cn-shanghai.aliyuncs.com/meeting/1/basicdefault_poster.png',  // 默认封面
  defaultActivityPoster: 'http://test-szw2.oss-cn-shanghai.aliyuncs.com/meeting/1/basicdefault_poster.png',  // 默认活动封面
  defaultAppPoster: 'http://test-szw2.oss-cn-shanghai.aliyuncs.com/meeting/1/basicdefault_poster.png',  // 默认应用封面
  defaultPLAvator: 'https://img.youpenglai.com/penglai/userhead/1a65a23a-ffb0-4195-8c8b-44158a1bd0d5.png',  // 默认应用封面
  defaultMurl: wzUrl ||  'https://wz.youpenglai.com/',
  defaultfotoupUrl: fotoupUrl ||  'http://fotoup.youpenglai.com',
  defaultPageSize: 10,
  activityInfo: {
    name: '',
    startTime: '',
    endTime: '',
  },
  signAppId: 'hdappsplsign20190620',
  meetingAppId: 'hdappsplwz0020190620',
  isOwner: '',  // 是否是微站管理者
  fotoupInfo: {
    appId: 'hdappsfotoup20190801',
    appStartUrl: 'https://fotoupadmin.youpenglai.com'
  }
});

export const mutations = {
  SHOW_ADD_ATTENDEE_DIALOG(state) {
    state.addAttendeeVisible = true;
  },
  setactivityinfo (state, data) {
    state.activityInfo.name = data.name
    state.activityInfo.startTime = data.startTime
    state.activityInfo.endTime = data.endTime
  },
  goAppService (state, appInfo) {
    if (appInfo && appInfo.isBind || appInfo.isPay) {
      this.$router.push({
        path: appInfo.appStartUrl,
        query: {
          instanceId: appInfo.instanceId,
          appId: appInfo.appId
        }
      })
    } else {
      this.$router.push({
        path: "/website/application/detail",
        query: {
          appId: appInfo.appId,
          instanceId: appInfo.instanceId
        }
      })
    }
  },
  goAppDeatil (state, appInfo) {
    this.$router.push({
      path: "/website/application/detail",
      query: {
        appId: appInfo.appId,
        instanceId: appInfo.instanceId
      }
    })
  },
  setuserinfo (state, info) {
    state.userInfo = info
  }
};

export const actions = {
  async getuserinfo ({commit, state}, params) {
    try {
      let result = await this.$axios.$get(`${state.userBaseUrl}info`)
      if (result) {
        localStorage.setItem('userInfo', JSON.stringify(result))
        commit("setuserinfo", result)
      }
    } catch (e) {
    }
  },
  async getAuthorizeCode({commit, state}, data) {
    return await this.$axios.$get(`${state.auth2BaseUrl}authorize?appId=${data.appId}&scope=${data.scope}&redirectUri=${encodeURI(data.redirectUrl)}`);
  },
  async getAuthCfg ({commit, state}, data) {
    try {
      let result = await this.$axios.$get(`${state.meetingBaseUrl}/meeting/${data.meetingId}/authCfg`);
      result && localStorage.setItem('moduleSettings', JSON.stringify(result.modules))
      if (!result.isOwner && data.isFormWap) {
        let moduleId;
        let path = '/wap/introduction';
        let moduleSettings = localStorage.getItem('moduleSettings') || '[]'
        moduleSettings = JSON.parse(moduleSettings)
        path = moduleSettings[0] && moduleSettings[0].path
        moduleId = moduleSettings[0] && moduleSettings[0].id
        this.$router.push({
          path: path,
          query: {
            meetingId: data.meetingId,
            moduleId: moduleId,
            appId: data.appId,
            instanceId: data.instanceId
          }
        })
      }
      state.isOwner = !!result.isOwner
    } catch (e) {
    }
  },
  async getAuthCfgCoop ({commit, state}, data) {
    return await this.$axios.$get(`${state.meetingBaseUrl}/meeting/${data.meetingId}/authCfg`);
  }
}
