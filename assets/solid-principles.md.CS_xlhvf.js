import{_ as s,c as t,o as i,ae as n}from"./chunks/framework.DgPKUjle.js";const k=JSON.parse('{"title":"SOLID原則とは","description":"","frontmatter":{},"headers":[],"relativePath":"solid-principles.md","filePath":"solid-principles.md"}'),e={name:"solid-principles.md"};function l(r,a,d,p,h,o){return i(),t("div",null,a[0]||(a[0]=[n(`<h1 id="solid原則とは" tabindex="-1">SOLID原則とは <a class="header-anchor" href="#solid原則とは" aria-label="Permalink to &quot;SOLID原則とは&quot;">​</a></h1><p>SOLID原則は、保守性・拡張性・再利用性の高いソフトウェアを構築するための設計指針であり、特にオブジェクト指向プログラミングにおいて重要です。<br> これらの原則は、開発後の変更要求に柔軟に対応できる「良い設計」を支えるものです。<br> 2000年代にRobert C. Martin氏によって提唱されました。</p><table tabindex="0"><thead><tr><th>頭文字</th><th>原則</th><th>説明</th><th>得られるメリット</th><th>チェックポイント例</th></tr></thead><tbody><tr><td><strong>S</strong></td><td><a href="./single-responsibility-principle.html">単一責任の原則</a></td><td>クラスは「たった一人のアクター」に対して責任を持つべき</td><td>変更理由が明確になり、修正や拡張がしやすくなる</td><td>- クラスは1つの理由でしか変更されないか<br>- 責務が混在していないか</td></tr><tr><td><strong>O</strong></td><td><a href="./open-closed-principle.html">オープンクローズドの原則</a></td><td>拡張に開かれ、修正に閉じているべき</td><td>既存コードを壊さずに新しい振る舞いを追加できる</td><td>- 新しい機能追加の際に既存クラスを修正していないか<br>- ポリモーフィズムや拡張ポイントを活用しているか</td></tr><tr><td><strong>L</strong></td><td><a href="./liskov-substitution-principle.html">リスコフの置換原則</a></td><td>サブタイプはスーパータイプと置換可能でなければならない</td><td>継承関係の一貫性を保ち、安全な拡張が可能になる</td><td>- 派生クラスを使ってもクライアントの挙動が破綻しないか<br>- 置き換えた際に予期せぬエラーが出ないか</td></tr><tr><td><strong>I</strong></td><td><a href="./interface-segregation-principle.html">インターフェース分離の原則</a></td><td>クライアントにとって不要なメソッドへの依存を強制しない</td><td>小さなインターフェースを提供し、結合度を下げる</td><td>- インターフェースが肥大化していないか<br>- クライアントが使わないメソッドに依存していないか</td></tr><tr><td><strong>D</strong></td><td><a href="./dependency-inversion-principle.html">依存性逆転の原則</a></td><td>上位モジュールと下位モジュールは抽象に依存すべき</td><td>実装に依存せず、モジュール間の独立性が高まる</td><td>- 実装ではなく抽象に依存しているか<br>- 上位モジュールが下位モジュールに直接依存していないか</td></tr></tbody></table><h2 id="なぜsolidが必要なのか" tabindex="-1">なぜSOLIDが必要なのか？ <a class="header-anchor" href="#なぜsolidが必要なのか" aria-label="Permalink to &quot;なぜSOLIDが必要なのか？&quot;">​</a></h2><p>現代のソフトウェア開発では、リリース後の機能追加・修正・保守が避けられません。<br> SOLID原則は、そのような変化に柔軟に対応できる設計を実現するために重要な指針です。</p><h2 id="solid原則を適用するメリット" tabindex="-1">SOLID原則を適用するメリット <a class="header-anchor" href="#solid原則を適用するメリット" aria-label="Permalink to &quot;SOLID原則を適用するメリット&quot;">​</a></h2><p>SOLID原則を適用することで、以下のような問題を解決できます。</p><h3 id="👎-非solidなコードの問題点" tabindex="-1">👎 非SOLIDなコードの問題点 <a class="header-anchor" href="#👎-非solidなコードの問題点" aria-label="Permalink to &quot;👎 非SOLIDなコードの問題点&quot;">​</a></h3><ul><li>ちょっとした修正が、意図しない別の場所に影響してバグが発生する</li><li>簡単な機能追加のはずなのに、多くの既存コードを変更する必要がある</li><li>コードの構造が複雑で、全体を理解するのに時間がかかる</li><li>再利用しづらく、似たような処理を何度も書いてしまう</li><li>モジュール同士の結びつきが強く、テストがしにくい</li></ul><h3 id="👍-solidなコードのメリット" tabindex="-1">👍 SOLIDなコードのメリット <a class="header-anchor" href="#👍-solidなコードのメリット" aria-label="Permalink to &quot;👍 SOLIDなコードのメリット&quot;">​</a></h3><ul><li>拡張性が高く、新機能の追加が容易</li><li>変更の影響範囲が局所的で、予測しやすい</li><li>モジュール単位でのテストが容易</li><li>コードの再利用性が高く、保守性が向上</li><li>チーム開発での理解・共有がしやすい</li></ul><h2 id="solid原則間の関連性" tabindex="-1">SOLID原則間の関連性 <a class="header-anchor" href="#solid原則間の関連性" aria-label="Permalink to &quot;SOLID原則間の関連性&quot;">​</a></h2><p>各原則は独立していますが、相互に関連し合っています。</p><ul><li><strong>単一責任の原則</strong>を守ることで、一つのクラスが複数の役割を持たなくなり、<strong>オープンクローズドの原則</strong>の適用が容易になります</li><li><strong>リスコフの置換原則</strong>は<strong>オープンクローズドの原則</strong>を支え、拡張性の高いコードを実現します</li><li><strong>インターフェース分離の原則</strong>と<strong>依存性逆転の原則</strong>は互いに補完し合い、疎結合なモジュール設計を促進します</li></ul><h3 id="solid原則の関連性" tabindex="-1">SOLID原則の関連性 <a class="header-anchor" href="#solid原則の関連性" aria-label="Permalink to &quot;SOLID原則の関連性&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">graph TD</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    S[単一責任の原則] --&gt; O[オープンクローズドの原則]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    L[リスコフの置換原則] --&gt; O</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    I[インターフェース分離の原則] --&gt; D[依存性逆転の原則]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D --&gt; O</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph &quot;高凝集&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        S</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph &quot;拡張性&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        O</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        L</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph &quot;疎結合&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        I</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        D</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span></code></pre></div><h2 id="学習を深めるためのリソース" tabindex="-1">学習を深めるためのリソース <a class="header-anchor" href="#学習を深めるためのリソース" aria-label="Permalink to &quot;学習を深めるためのリソース&quot;">​</a></h2><ul><li><a href="https://www.amazon.co.jp/dp/0134494164" target="_blank" rel="noreferrer">Clean Architecture: A Craftsman&#39;s Guide to Software Structure and Design</a> - Robert C. Martin著</li><li><a href="https://www.amazon.co.jp/dp/0135974445" target="_blank" rel="noreferrer">Agile Software Development, Principles, Patterns, and Practices</a> - Robert C. Martin著</li><li><a href="http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod" target="_blank" rel="noreferrer">The Principles of OOD</a> - Robert C. Martin公式サイト</li><li><a href="https://qiita.com/KouMatsu/items/ca4e26336cc04fbc93d8" target="_blank" rel="noreferrer">TypeScriptで学ぶSOLID原則（Qiita）</a></li><li><a href="https://dev.to/harshaash/solid-principles-with-typescript-1kfc" target="_blank" rel="noreferrer">SOLID Principles with TypeScript（dev.to）</a></li><li><a href="https://refactoring.guru/design-patterns/solid" target="_blank" rel="noreferrer">Refactoring.Guru: SOLID</a></li></ul>`,18)]))}const E=s(e,[["render",l]]);export{k as __pageData,E as default};
