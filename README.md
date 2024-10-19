# SOLIDの原則

ソフトウェア構築時に従うべきガイドライン

オブジェクト指向プログラミングにおいて、変更しやすく・理解しやすく・再利用しやすいモジュールを設計／開発するためにの５つの原則

2000年代にRobert　C. Martin氏によって提唱された

## SOLID原則とは

- [S: Single Responsibility Principle (単一責任の原則)](single-responsibility-principle.md)
- [O: Open Closed Principle (オープンクローズドの原則)](open-closed-principle.md)
- [L: Liskov Substitution Principle: (リスコフの置換原則)](liskov-substitution-principle.md)
- [I: Interface Segregation Principle (インターフェース分離の原則)](interface-segregation-principle.md)
- [D: Dependency Inversion Principle (依存性逆転の原則)](dependency-inversion-principle.md)

## SOLID原則を学ぶ意義

SOLID原則を学ぶことで、以下の状況を改善できる可能性が高まる

- コードの修正が想定外の箇所に影響してバグが生まれてしまう
- 簡単な機能の追加で大量の既存コードを修正する必要がある
- コードの依存関係が複雑で、理解するのに膨大な時間がかかる
- 既存のコードが再利用しにくく、同じようなコードが量産されている
- コード間の依存度が強く、単体テストができないコードが大量にある
