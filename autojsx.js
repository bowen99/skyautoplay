// // var down1 = android.os.Environment.getExternalStorageDirectory() + "/Android/data/com.Maple.SkyStudio/files/Sheet/yuepu.zip";
// var down2 = android.os.Environment.getExternalStorageDirectory() + "/Documents/SkyAutoPlayer/sheet.zip/"
// var url = "https://gitee.com/work-for-myself/autojs-map/raw/master/shared_sheets.zip";
// var res = http.get(url);
// // files.writeBytes(down1, res.body.bytes());
// files.writeBytes(down2, res.body.bytes());
// toast("下载成功");
"ui";
//gitee网址列表
var urllist = ["https://gitee.com/work-for-myself/autojs-map/raw/master/sheets.zip", "https://gitee.com/work-for-myself/autojs-map/raw/master/bitmaps.zip",
	"https://gitee.com/work-for-myself/autojs-map/raw/master/%E8%84%9A%E6%9C%AC.zip"
];
//QQ群下载文件地址
var qqfile = android.os.Environment.getExternalStorageDirectory() + "/Android/data/com.tencent.mobileqq/Tencent/QQfile_recv/";
//乐谱压缩档下载地址
var downfile = android.os.Environment.getExternalStorageDirectory() + "/Documents/SkyAutoPlayer/sheets.zip/";
//map压缩档下载地址
var mapfiles = android.os.Environment.getExternalStorageDirectory() + "/Documents/SkyAutoPlayer/bitmap.zip";
var jiaobenfiles = android.os.Environment.getExternalStorageDirectory() + "/Documents/SkyAutoPlayer/脚本.zip";
//解压后的位置
var yuepudir = android.os.Environment.getExternalStorageDirectory() + "/Documents/SkyAutoPlayer/"
var yue = android.os.Environment.getExternalStorageDirectory() + "/Documents/SkyAutoPlayer/sheets/"
var jiaobendir = "/storage/emulated/0/"
ui.layout(
	<vertical padding="16">
		{/* <text textSize="16sp" textColor="black" text="请输入姓名" /> */}
		<button style="Widget.AppCompat.Button.Colored" text="移动Q群下载的乐谱(TX加密,不好使,老系统能用)" id="move" />
		<button style="Widget.AppCompat.Button.Colored" text="清空本地所有乐谱" id="exist" />
		<button style="Widget.AppCompat.Button.Colored" text="清空本地所有脚本" id="jbcls" />
		<button style="Widget.AppCompat.Button.Colored" text="下载脚本到本地" id="jiaoben" />
		<button style="Widget.AppCompat.Button.Colored" text="下载乐谱到本地" id="down" />

		{/* <button id="ok" text="确定" /> */}
	</vertical>
);


// //移动乐谱失效
ui.move.click(function () {

	files.createWithDirs(yuepudir + "sheets/")
	files.removeDir(qqfile)
	var txtFiles = files.listDir(qqfile, function (name) {
		return name.endsWith(".txt") && files.isFile(files.join(dir, name));
	});
	toast("正在移动曲谱中")
	for (var i in txtFiles) {
		var sheets = qqfile + txtFiles[i];
		var yuepu = yuepudir + "sheets/" + txtFiles[i];
		files.copy(sheets, yuepu);
	};
	toast("曲谱移动完成")
});
//删除SkyAutoPlayer文件夹
ui.exist.click(function () {
	toast("正在清空曲谱中")
	files.removeDir(yue)
	toast("曲谱清空完成")
});
//清空脚本
ui.jbcls.click(function () {
	toast("正在清空脚本")
	files.removeDir(jiaobendir + "脚本/")
	toast("脚本清空完成")
});
//下载脚本压缩档,然后解压到指定位置
ui.jiaoben.click(function () {
	threads.start(function () {
		files.createWithDirs(yuepudir)
		files.createWithDirs(jiaobendir)
		var url = "https://gitee.com/work-for-myself/autojs-map/raw/master/%E8%84%9A%E6%9C%AC.zip";
		var res = http.get(url);
		if (res.statusCode != 200) {
			toast("请求失败");
		};
		toast("正在下载脚本中")
		files.writeBytes(downfile, res.body.bytes());
		// num++;
		function jieyajb() {
			try {
				//解压加密的zip
				toast("正在解压脚本到本地中")
				$zip.unzip(downfile, jiaobendir);
				toast("已完成")
				// $zip.unzip(mapfiles, yuepudir);
				// $zip.unzip(jiaobenfiles, jiaobendir);
				return true
			} catch (e) {
				log(downfile)
				return false
			}
		}
		jieyajb();
		files.remove(downfile)


	});
});
//下载bitmaps和乐谱压缩档,然后解压到指定位置
ui.down.click(function () {
	threads.start(function () {
		files.createWithDirs(yuepudir)
		files.createWithDirs(jiaobendir)
		for (var i in urllist) {
			var url = urllist[i];
			var res = http.get(url);
			if (res.statusCode != 200) {
				toast("请求失败");
			};
			toast("正在下载乐谱到本地中")
			files.writeBytes(downfile, res.body.bytes());
			// num++;
			function jieya() {
				try {
					//解压加密的zip
					toast("正在解压乐谱到本地中")
					$zip.unzip(downfile, yuepudir);
					// $zip.unzip(mapfiles, yuepudir);
					// $zip.unzip(jiaobenfiles, jiaobendir);
					return true
				} catch (e) {
					log(downfile)
					return false
				}
			}
			jieya();
			toast("正在删除缓存")
			files.remove(downfile)
			toast("已完成")
		};
	});
});