#-----------------------------------------------------------------------------
# タイトル: Rubyシリーズ課題（じゃんけんゲームを作成する）
# 作成者:梶原康範
# 作成日: 2019/05/02初回作成
# 更新履歴: 2019/05/03入力判定メソッド(judge_inputをprivateメソッドとして追加)
#------------------------------------------------------------------------------

#----------------------------
#自分の手を取得するクラス
#----------------------------
class Player
  
  #入力が適正か判定するメソッド
  def judge_input(hand)
    #入力文字列の長さが1かつ0-2を削除して長さが0になれば入力OK
    if (hand.length == 1) && (hand.delete("[0-2]").length == 0)
      isContinue = false
    else
      isContinue = true
    end
    return isContinue
  end
  
  private :judge_input #judge_inputはクラス内部でしか使用しないためprivateメソッドに公開レベル変更
  
  # コンソールを入力待ち状態にし、プレイヤーがコンソールから打ち込んだ値を出力する処理のメソッド
  def get_hand
    
    #再入力判定フラグ
    isContinue = true 

    while isContinue do
      hand = gets.chomp #gets.to_iは無効な入力には0がかえってくるので注意。chompないと改行コードも入ってくるので注意
      isContinue = judge_input(hand)
      if isContinue == true
        puts "入力は0 or 1 or 2のどれかで行ってください"
      end
    end 
    return hand.to_i
  end
end

#-----------------------------------
#相手の手をランダムに選択するクラス
#-----------------------------------
class Enemy
  # グー、チョキ、パーの値をランダムに出力するメソッド
  def get_hand
    result_arr = [0, 1, 2]
    return result_arr.sample(1)[0]
  end
end

#----------------------------
#じゃんけん実施クラス
#----------------------------
class Janken
  #じゃんけん実施メソッド
  def pon(player, enemy)

    #勝敗判定アルゴリズム {(自分の手ー相手の手) + 3} % 3 が0:引き分け、1:負け、2:勝ち
    
    puts "数字を入力してください。\n 0:グー\n 1:パー\n 2:チョキ"
    
    player_hand = player.get_hand #自分の手取得
    enemy_hand = enemy.get_hand #相手の手取得
    
    hand_type = ["グー", "チョキ", "パー"] #数値⇒手の日本語名変換用配列

    isContinue = true #あいこの場合の勝負継続フラグ作成
  
    #勝負がつくまでじゃんけんループ継続    
    while isContinue do
      judge_number = ((player_hand - enemy_hand) + 3) % 3 #勝負判定アルゴリズム 0:引き分け、1:負け、2:勝ち
      
      puts "-----------------------------------------"
      puts "自分の手:#{hand_type[player_hand]}"
      puts "相手の手:#{hand_type[enemy_hand]}"
      puts "-----------------------------------------"
      
      case judge_number
      when  2
        puts "相手の手は#{hand_type[enemy_hand]}です。あなたの勝ちです。"
        isContinue = false
      when 1
        puts "相手の手は#{hand_type[enemy_hand]}です。あなたの負けです。"
        isContinue = false
      else
        puts "相手の手は#{hand_type[enemy_hand]}です。あいこなのでもう一度0~2の数値を入力してください。"
        player_hand = player.get_hand #自分の手を再取得
        enemy_hand = enemy.get_hand #相手の手再取得
      end
    end
  end
end


#自分の手を計算するインスタンス作成
player = Player.new

#相手の手をランダム取得するインスタンス作成
enemy = Enemy.new

#じゃんけんインスタンス作成
janken = Janken.new

#じゃんけん実施
janken.pon(player, enemy)

