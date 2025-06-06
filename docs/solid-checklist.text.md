---
description: 各SOLID原則ごとのチェックリストを通じて、実装時の設計品質を確認できる実践的なガイドです。
---
# ✅ SOLID原則 チェックリスト

## ☑︎ 単一責任の原則（SRP）
- [ ] このクラスは1つの理由でしか変更されないか？
- [ ] 責務が複数混在していないか？
- [ ] クラスやモジュールに複数の役割が混在していないか？
- [ ] テストしやすいように、責務が明確に分離されているか？
- [ ] そのクラスの「変更理由」は1種類に限定されているか？

## ☑︎ オープンクローズドの原則（OCP）
- [ ] 新しい機能追加の際に既存クラスを修正していないか？
- [ ] ポリモーフィズムや拡張ポイントを利用しているか？
- [ ] 拡張のために既存のコード（if文・switch文など）を頻繁に修正していないか？
- [ ] 新しい振る舞いを既存コードの変更なしに追加できる構成か？
- [ ] 抽象（インターフェース・基底クラス）を利用して柔軟に設計されているか？

## ☑︎ リスコフの置換原則（LSP）
- [ ] 派生クラスは親クラスとして振る舞えるか？
- [ ] クライアントコードに影響なく置き換えられるか？
- [ ] サブクラスが親クラスの期待する振る舞いをすべて満たしているか？
- [ ] サブクラスで例外的な動作（throwなど）をしていないか？
- [ ] クライアントコードがサブクラスと親クラスを区別せず使えているか？

## ☑︎ インターフェース分離の原則（ISP）
- [ ] インターフェースは肥大化していないか？
- [ ] クライアントが不要なメソッドに依存していないか？
- [ ] インターフェースが1つの関心事（責任）に特化しているか？
- [ ] 不要なメソッドの空実装や例外的実装が発生していないか？
- [ ] 利用側に応じた適切な粒度のインターフェースが提供されているか？

## ☑︎ 依存性逆転の原則（DIP）
- [ ] 実装ではなく抽象に依存しているか？
- [ ] 上位モジュールが下位モジュールに依存していないか？
- [ ] 高レベルモジュールが低レベルの具体実装に依存していないか？
- [ ] 実装ではなく抽象（インターフェース、抽象クラス）に依存しているか？
- [ ] コンストラクタ注入、DIコンテナ、ファクトリなどで依存関係を外部化しているか？
