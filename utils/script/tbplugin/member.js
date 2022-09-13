var memberPlugin = requirePlugin("cemMember");
export default async function memberCheck() {

  const memberPluginResult = await new Promise((resolve, reject) => {
    memberPlugin.checkMember({
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    });
  })
  return memberPluginResult.data.isMember == "false" ? false : true
}
