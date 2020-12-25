module.exports = function (source) {
  //source
  //   console.log(this.query);
  //   ;
  const callback = this.async();
  setTimeout(() => {
    const result = source.replace("laohan", "阿西吧");
    callback(null, result);
  }, 3000);
  //   this.callback(null, result);
};
