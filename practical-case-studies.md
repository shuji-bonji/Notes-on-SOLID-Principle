# SOLID原則ケーススタディ：ECサイト機能拡張

## シナリオ

あなたは既存のECサイトに新しい支払い方法やロイヤリティプログラムを追加する必要があります。
コードベースはSOLID原則に従っておらず、機能追加が難しい状況です。

## 非SOLIDなコード（Before）

```ts
class Order {
  items = [];
  totalPrice = 0;
  userId = '';
  
  // 支払い処理
  processPayment(paymentType: string) {
    if (paymentType === 'credit') {
      console.log('クレジットカード処理');
      // クレジットカード処理のロジック
    } else if (paymentType === 'bank') {
      console.log('銀行振込処理');
      // 銀行振込処理のロジック
    }
    // 新しい支払い方法を追加するたびにこのメソッドを変更する必要がある
  }
  
  // ポイント計算
  calculatePoints() {
    // 通常会員のポイント計算ロジック
    return this.totalPrice * 0.01;
  }
  
  // 注文確認メール送信
  sendConfirmationEmail() {
    console.log('注文確認メール送信');
    // メール送信ロジック
  }
}
```

## リファクタリング：SOLIDに準拠（After）

### 単一責任の原則を適用

```ts
class Order {
  items = [];
  totalPrice = 0;
  userId = '';
}

class PaymentProcessor {
  processPayment(order: Order, paymentType: string) {
    // 支払い処理のみに責任を持つ
  }
}

class EmailService {
  sendConfirmationEmail(order: Order) {
    // メール送信のみに責任を持つ
  }
}

class PointsCalculator {
  calculatePoints(order: Order) {
    // ポイント計算のみに責任を持つ
  }
}
```

### オープンクローズドとリスコフの置換原則を適用

```ts
interface PaymentMethod {
  process(order: Order): void;
}

class CreditCardPayment implements PaymentMethod {
  process(order: Order): void {
    console.log('クレジットカード処理');
  }
}

class BankTransferPayment implements PaymentMethod {
  process(order: Order): void {
    console.log('銀行振込処理');
  }
}

// 新しい支払い方法を追加しても既存コードは変更不要
class PayPalPayment implements PaymentMethod {
  process(order: Order): void {
    console.log('PayPal処理');
  }
}

class PaymentProcessor {
  constructor(private paymentMethod: PaymentMethod) {}
  
  processPayment(order: Order) {
    this.paymentMethod.process(order);
  }
}
```

### インターフェース分離原則を適用

```ts
interface PointsCalculator {
  calculatePoints(amount: number): number;
}

class RegularCustomerPoints implements PointsCalculator {
  calculatePoints(amount: number): number {
    return amount * 0.01; // 1%
  }
}

class PremiumCustomerPoints implements PointsCalculator {
  calculatePoints(amount: number): number {
    return amount * 0.05; // 5%
  }
}
```

### 依存性逆転の原則を適用

```ts
class OrderService {
  constructor(
    private paymentProcessor: PaymentProcessor,
    private emailService: EmailService,
    private pointsCalculator: PointsCalculator
  ) {}
  
  completeOrder(order: Order, paymentType: string) {
    // 高レベルの処理フロー
    // 低レベルのモジュールに直接依存せず、抽象に依存
  }
}
```

## 利点

- 新しい支払い方法の追加が容易に
- 会員ランクによって異なるポイント計算が可能に
- テストが容易に（モック化が簡単）
- 責任が明確で、コードの理解が容易に