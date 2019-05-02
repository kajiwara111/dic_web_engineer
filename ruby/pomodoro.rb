#ライブラリ読み込み
require 'launchy'

#24分間Youtube開く
Launchy.open("https://www.youtube.com/?gl=JP&hl=ja")

#24分間処理を停止する
sleep(60 * 24)

#24分経ったら休憩用サイト開く

Launchy.open("https://diveintocode.jp/")



