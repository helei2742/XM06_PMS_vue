/**
 * 向事件总线发送事件
 * @param eventName 事件名称
 * @param data  数据
 * author heleidage
 */
export function emitEvent(eventName, data){
  this.$eventBus.$emit(eventName, data)
}

/**
 * 向事件总线发送失败事件
 * @param data 数据
 * author heleidage
 */
export function emitFailEvent(data) {
  emitEvent.call(this, 'fail', data)
}


/**
 * 向事件总线发送关闭消息卡事件
 * @param data 数据
 * author heleidage
 */
export function emitCardCloseEvent(data) {
  emitEvent.call(this, 'cardclose', data)
}

/**
 * 向事件总线发送成功事件
 * @param data
 */
export function emitSuccess(data) {
  emitEvent.call(this, 'success', data)
}



/**
 * 向事件总线注册监听事件和回调方法
 * @param eventName 事件名称
 * @param func  回调方法，
 * author heleidage
 */
export function listenEvent(eventName, func) {
  this.$eventBus.$on(eventName, (data) => {
    func.call(this, data)
  })
}

/**
 * 向事件总线注册失败监听
 * @param func 回调方法
 * author heleidage
 */
export function listenFailEvent(func) {
  listenEvent.call(this, 'fail', func)
}

/**
 * 向事件总线注册关闭信息卡监听
 * @param func 回调方法
 * author heleidage
 */
export function listenCardCloseEvent(func) {
  listenEvent.call(this, 'cardclose', func)
}

/**
 * 向事件总线注册成功信息监听
 * @param func
 */
export function listenSuccess(func) {
  listenEvent.call(this, 'success', func)
}

