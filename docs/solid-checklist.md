---
description: SOLID原則を実践するためのチェックリスト。基本項目と詳細項目を体系的に整理しています。
---
# 各原則のチェックリスト（基本 + 詳細）

| 原則 | 基本項目 | 詳細項目 |
|------|----------|----------|
| 単一責任<br>（SRP） | □ このクラスは1つの理由でしか変更されないか？<br>□ 責務が複数混在していないか？ | □ クラスやモジュールに複数の役割が混在していないか？<br>□ テストしやすいように、責務が明確に分離されているか？<br>□ そのクラスの「変更理由」は1種類に限定されているか？ |
| オープンクローズド<br>（OCP） | □ 新しい機能追加の際に既存クラスを修正していないか？<br>□ ポリモーフィズムや拡張ポイントを利用しているか？ | □ 拡張のために既存のコード（if文・switch文など）を頻繁に修正していないか？<br>□ 新しい振る舞いを既存コードの変更なしに追加できる構成か？<br>□ 抽象（インターフェース・基底クラス）を利用して柔軟に設計されているか？ |
| リスコフの置換原則<br>（LSP） |□ 派生クラスは親クラスとして振る舞えるか？<br>□ クライアントコードに影響なく置き換えられるか？ | □ サブクラスが親クラスの期待する振る舞いをすべて満たしているか？<br>□ サブクラスで例外的な動作（throwなど）をしていないか？<br>□ クライアントコードがサブクラスと親クラスを区別せず使えているか？ |
| インターフェース分離<br>（ISP） | □ インターフェースは肥大化していないか？<br>□ クライアントが不要なメソッドに依存していないか？ | □ インターフェースが1つの関心事（責任）に特化しているか？<br>□ 不要なメソッドの空実装や例外的実装が発生していないか？<br>□ 利用側に応じた適切な粒度のインターフェースが提供されているか？ |
| 依存性逆転<br>（DIP） | □ 実装ではなく抽象に依存しているか？<br>□ 上位モジュールが下位モジュールに依存していないか？ | □ 高レベルモジュールが低レベルの具体実装に依存していないか？<br>□ 実装ではなく抽象（インターフェース、抽象クラス）に依存しているか？<br>□ コンストラクタ注入、DIコンテナ、ファクトリなどで依存関係を外部化しているか？ |

[テキスト版はこちら](./solid-checklist.text.md)