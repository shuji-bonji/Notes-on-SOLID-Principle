# SOLIDの原則
SOLIDの原則についての覚書です。

## SOLID原則とは

SOLID原則は、ソフトウェアを構築する際に守るべき5つの基本原則です。  
オブジェクト指向プログラミングにおいて、「変更しやすく」「理解しやすく」「再利用しやすい」モジュールを設計・開発するための指針となります。  
2000年代にRobert C. Martin氏によって提唱されました。

- [S: Single Responsibility Principle (単一責任の原則)](single-responsibility-principle.md)
- [O: Open Closed Principle (オープンクローズドの原則)](open-closed-principle.md)
- [L: Liskov Substitution Principle: (リスコフの置換原則)](liskov-substitution-principle.md)
- [I: Interface Segregation Principle (インターフェース分離の原則)](interface-segregation-principle.md)
- [D: Dependency Inversion Principle (依存性逆転の原則)](dependency-inversion-principle.md)

## SOLID原則を学ぶ意義

SOLID原則を学ぶことで、ソフトウェア開発における以下のような問題を解決しやすくなります。

- ちょっとした修正が、意図しない別の場所に影響してバグが発生する
- 簡単な機能追加のはずなのに、多くの既存コードを変更する必要がある
- コードの構造が複雑で、全体を理解するのに時間がかかる
- 再利用しづらく、似たような処理を何度も書いてしまう
- モジュール同士の結びつきが強く、テストがしにくい
