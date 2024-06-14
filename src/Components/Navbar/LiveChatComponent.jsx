import React, { useEffect } from 'react'

const LiveChatComponent = () => {
  useEffect(() => {
    // Configs
    let liveChatBaseUrl = document.location.protocol + '//' + 'livechat.fpt.ai/v36/src'
    let LiveChatSocketUrl = 'livechat.fpt.ai:443'
    let FptAppCode = 'd120af3c1c3596e8f3a122d7986291c7'
    let FptAppName = 'WebTuyendung'
    // Define custom styles
    let CustomStyles = {
      // custom styles here
    }

    // Get bot code from url if FptAppCode is empty
    if (!FptAppCode) {
      let appCodeFromHash = window.location.hash.substr(1)
      if (appCodeFromHash.length === 32) {
        FptAppCode = appCodeFromHash
      }
    }

    // Set Configs
    let FptLiveChatConfigs = {
      appName: FptAppName,
      appCode: FptAppCode,
      themes: '',
      styles: CustomStyles,
    }

    // Append Script
    let FptLiveChatScript = document.createElement('script')
    FptLiveChatScript.id = 'fpt_ai_livechat_script'
    FptLiveChatScript.src = liveChatBaseUrl + '/static/fptai-livechat.js'
    document.body.appendChild(FptLiveChatScript)

    // Append Stylesheet
    let FptLiveChatStyles = document.createElement('link')
    FptLiveChatStyles.id = 'fpt_ai_livechat_style'
    FptLiveChatStyles.rel = 'stylesheet'
    FptLiveChatStyles.href = liveChatBaseUrl + '/static/fptai-livechat.css'
    document.body.appendChild(FptLiveChatStyles)

    // Init
    FptLiveChatScript.onload = function () {
      window.fpt_ai_render_chatbox(FptLiveChatConfigs, liveChatBaseUrl, LiveChatSocketUrl)
    }

    // Cleanup
    return () => {
      // Cleanup if needed
    }
  }, [])

  return <div id='fpt-ai-livechat-container'>{/* Placeholder for FPT AI Live Chat */}</div>
}

export default LiveChatComponent

