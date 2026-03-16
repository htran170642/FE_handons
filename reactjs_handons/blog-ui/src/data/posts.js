// ============================================================
// src/data/posts.js — Mock data cho Blog UI
// ============================================================
//
// Trong ứng dụng thực, data này đến từ API (fetch/axios).
// Ở đây ta dùng data tĩnh để tập trung học React, không phân
// tâm vào backend. Sau này chỉ cần đổi setTimeout → fetch().
//
// THIẾT KẾ DATA SHAPE:
//   Data shape (hình dạng object) quyết định props của components.
//   Mỗi field ở đây sẽ trực tiếp ảnh hưởng đến cách ta viết JSX.
//   Thiết kế tốt ở đây = code sạch ở UI.
// ============================================================

// AUTHORS — object riêng, không lồng thẳng vào POSTS
// Lý do: nếu cùng author viết nhiều bài, ta reference thay vì copy.
// Trong UI, ta truyền author object xuống component con qua props.
export const AUTHORS = {
  alice: { id: 'alice', name: 'Alice Nguyễn', avatar: '👩‍💻' },
  bob:   { id: 'bob',   name: 'Bob Trần',     avatar: '🧑‍🔬' },
  carol: { id: 'carol', name: 'Carol Lê',     avatar: '👩‍🎨' },
};

// POSTS — mảng 10 bài viết, trải đều 3 category: Tech / Life / Science
//
// Chú ý 2 field quan trọng:
//   excerpt — đoạn tóm tắt ngắn, chỉ hiển thị ở PostCard (danh sách)
//   content — nội dung đầy đủ, chỉ hiển thị ở PostDetail (chi tiết)
//
// Đây là ví dụ của nguyên tắc: "components chỉ dùng những gì chúng cần".
// PostCard nhận object post đầy đủ, nhưng chỉ đọc post.excerpt.
// PostDetail nhận cùng object đó, nhưng đọc post.content thay vì excerpt.
export const POSTS = [
  // ── TECH (4 bài) ──────────────────────────────────────────
  {
    id: 1,
    title: 'Getting Started with React Hooks',
    excerpt:
      'useState và useEffect là hai hook cơ bản nhất trong React. Hiểu chúng là bước đầu tiên để viết React hiện đại.',
    content: `React Hooks được giới thiệu ở phiên bản 16.8 (2019), thay thế hoàn toàn class components cho phần lớn use cases.

## useState — lưu trữ state cục bộ

\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`

useState trả về một tuple gồm:
- Giá trị state hiện tại (count)
- Hàm để cập nhật nó (setCount)

Khi gọi setCount(newValue), React re-render component với giá trị mới.

## useEffect — xử lý side effects

Side effects là những thứ "ngoài luồng render": gọi API, đặt timer, subscribe events...

\`\`\`jsx
useEffect(() => {
  // Chạy sau mỗi lần render (mặc định)
  document.title = \`Count: \${count}\`;
}, [count]); // chỉ chạy lại khi count thay đổi
\`\`\`

Dependency array [] kiểm soát khi nào effect chạy:
- Không có []: chạy sau mỗi render
- []: chỉ chạy một lần (componentDidMount)
- [dep1, dep2]: chạy khi dep1 hoặc dep2 thay đổi

Học 2 hooks này thật kỹ — 80% React code chỉ dùng 2 hooks này.`,
    category: 'Tech',
    tags: ['React', 'JavaScript', 'Hooks'],
    author: AUTHORS.alice,
    date: '2024-01-15',
    readTime: 5,
  },
  {
    id: 2,
    title: 'Immutability trong JavaScript: Tại sao quan trọng với React',
    excerpt:
      'React so sánh state cũ và mới bằng reference. Nếu bạn mutate trực tiếp, React sẽ không thấy sự thay đổi và không re-render.',
    content: `## Vấn đề với mutation

\`\`\`js
// ❌ SAI — mutate trực tiếp
const arr = [1, 2, 3];
arr.push(4); // arr vẫn là cùng reference!
setState(arr); // React nghĩ không có gì thay đổi
\`\`\`

React dùng Object.is() để so sánh. Nếu reference không đổi, React bỏ qua update đó.

## Cách làm đúng: tạo bản sao mới

\`\`\`js
// ✅ ĐÚNG — tạo array mới
setState([...arr, 4]);           // thêm phần tử
setState(arr.filter(x => x !== 2)); // xóa phần tử
setState(arr.map(x => x === 2 ? 99 : x)); // cập nhật phần tử
\`\`\`

Với object:
\`\`\`js
// ✅ ĐÚNG — spread operator tạo object mới
setState({ ...obj, name: 'Alice' });
\`\`\`

## Tại sao React thiết kế như vậy?

Immutability cho phép React thực hiện "time-travel debugging", concurrent rendering, và tối ưu performance bằng cách bỏ qua re-render không cần thiết. Đây là thiết kế có chủ đích, không phải hạn chế.`,
    category: 'Tech',
    tags: ['JavaScript', 'React', 'Performance'],
    author: AUTHORS.alice,
    date: '2024-02-03',
    readTime: 7,
  },
  {
    id: 3,
    title: 'CSS Grid vs Flexbox: Khi nào dùng cái nào?',
    excerpt:
      'Flexbox là 1 chiều (hàng hoặc cột). Grid là 2 chiều. Hiểu rõ sự khác biệt này giúp bạn chọn đúng công cụ cho mỗi layout.',
    content: `## Flexbox — layout 1 chiều

Flexbox hoạt động theo một trục tại một thời điểm: hoặc row, hoặc column.

\`\`\`css
.container {
  display: flex;
  justify-content: space-between; /* trục chính (main axis) */
  align-items: center;           /* trục phụ (cross axis) */
  gap: 16px;
}
\`\`\`

Dùng Flexbox khi:
- Căn giữa một element
- Phân bố items theo hàng hoặc cột
- Navigation bars, button groups, form layouts

## CSS Grid — layout 2 chiều

Grid kiểm soát cả hàng lẫn cột cùng lúc.

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 cột bằng nhau */
  gap: 24px;
}
\`\`\`

Dùng Grid khi:
- Page layout tổng thể (header, sidebar, main, footer)
- Card grids / image galleries
- Bất cứ layout nào cần kiểm soát 2 chiều đồng thời

## Kết luận thực tế

Trong blog này: Grid cho danh sách bài viết, Flexbox cho AuthorBadge và các row nhỏ bên trong card.`,
    category: 'Tech',
    tags: ['CSS', 'Layout', 'Frontend'],
    author: AUTHORS.carol,
    date: '2024-02-20',
    readTime: 6,
  },
  {
    id: 4,
    title: 'TypeScript Generics: Viết code tái sử dụng với type safety',
    excerpt:
      'Generics cho phép bạn viết một function hoạt động với nhiều kiểu dữ liệu khác nhau mà vẫn giữ được type checking đầy đủ.',
    content: `## Vấn đề không có Generics

\`\`\`ts
function getFirst(arr: number[]): number { return arr[0]; }
function getFirst(arr: string[]): string { return arr[0]; } // ❌ duplicate!
\`\`\`

Hoặc dùng any và mất type safety:
\`\`\`ts
function getFirst(arr: any[]): any { return arr[0]; } // ❌ mất type info
\`\`\`

## Giải pháp: Generic Function

\`\`\`ts
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const n = getFirst([1, 2, 3]);    // TypeScript biết n: number
const s = getFirst(['a', 'b']);   // TypeScript biết s: string
\`\`\`

T là "type parameter" — như function parameter nhưng cho kiểu dữ liệu.

## Generic với React

\`\`\`tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map((item, i) => <li key={i}>{renderItem(item)}</li>)}</ul>;
}
\`\`\`

Đây là pattern rất phổ biến trong React component libraries.`,
    category: 'Tech',
    tags: ['TypeScript', 'JavaScript', 'Types'],
    author: AUTHORS.bob,
    date: '2024-03-10',
    readTime: 8,
  },

  // ── LIFE (3 bài) ──────────────────────────────────────────
  {
    id: 5,
    title: 'Deep Work: Làm việc tập trung trong thời đại distraction',
    excerpt:
      'Cal Newport định nghĩa Deep Work là khả năng tập trung không bị gián đoạn vào task nhận thức khó. Đây là kỹ năng hiếm và có giá trị.',
    content: `## Deep Work là gì?

Cal Newport định nghĩa: "Professional activity performed in a state of distraction-free concentration that push your cognitive capabilities to their limit."

Ngược lại là **Shallow Work**: email, meetings, admin tasks — không cần tập trung cao, dễ replicate.

## Tại sao Deep Work ngày càng hiếm?

1. **Mạng xã hội thiết kế để addictive** — mỗi notification là dopamine hit nhỏ
2. **Open office làm tăng interruptions** — trung bình mất 23 phút để lấy lại focus sau khi bị ngắt
3. **Email culture đòi hỏi phản hồi ngay** — tạo cảm giác luôn phải "available"

## Xây dựng Deep Work habit

**Ritualize**: Cùng giờ, cùng địa điểm, cùng quy trình mỗi ngày. Não bộ học rằng đây là "giờ làm việc thật sự".

**Embrace boredom**: Đừng dùng điện thoại khi nhàm chán (xếp hàng, chờ đèn đỏ). Tập cho não chịu đựng khi không có stimulation.

**Quit social media**: Hoặc ít nhất, set "office hours" cho social media thay vì check liên tục.

Mục tiêu thực tế: 4 giờ Deep Work/ngày là đủ để làm được công việc xuất sắc.`,
    category: 'Life',
    tags: ['Productivity', 'Focus', 'Books'],
    author: AUTHORS.carol,
    date: '2024-01-28',
    readTime: 6,
  },
  {
    id: 6,
    title: 'Học một ngôn ngữ lập trình mới: Framework hiệu quả nhất',
    excerpt:
      'Thay vì đọc sách từ đầu đến cuối, hãy build một project nhỏ ngay từ ngày đầu. Học qua làm nhanh hơn học qua đọc gấp 5 lần.',
    content: `## Vấn đề với cách học truyền thống

Tutorial hell: bạn xem 50 tutorial, làm theo từng bước, rồi ngồi trước blank editor và không biết bắt đầu từ đâu.

Lý do: tutorial cung cấp **scaffolding** (người hướng dẫn làm thay bạn) nhưng không xây dựng **mental model** thực sự.

## Framework hiệu quả: Project-based learning

**Ngày 1-3: Syntax crash course**
Học chỉ đủ để viết được code: variables, functions, loops, conditionals. Không cần học hết.

**Ngày 4-30: Build project nhỏ thực tế**
Chọn một project bạn thực sự muốn làm (không phải todo app). Mỗi lần gặp vấn đề, tìm cách giải quyết. Đây là lúc học thực sự xảy ra.

**Sau đó: Tăng độ phức tạp dần**
Mỗi project tiếp theo phức tạp hơn một chút. Học theo nhu cầu, không học trước rồi để quên.

## Áp dụng với React

Đây là chính xác cách mà repo này được thiết kế: mỗi project practice là một cơ hội "gặp vấn đề thực tế và tự giải quyết" — không phải copy tutorial.`,
    category: 'Life',
    tags: ['Learning', 'Programming', 'Career'],
    author: AUTHORS.alice,
    date: '2024-02-14',
    readTime: 5,
  },
  {
    id: 7,
    title: 'Remote Work sau 3 năm: Những gì thực sự hoạt động',
    excerpt:
      'Không phải Work From Home mà là Work From Anywhere. Sau 3 năm, đây là những habits đã thực sự tạo ra sự khác biệt.',
    content: `## Tách biệt không gian làm việc

Không phải ai cũng có phòng riêng, nhưng **dedicated corner** là đủ. Não bộ liên kết không gian với hành vi: nếu bạn làm việc trên giường, bạn sẽ khó ngủ tại đó.

Quy tắc đơn giản: có một chỗ chỉ để làm việc, dù nhỏ đến đâu.

## Over-communicate với team

Remote làm mất đi "ambient awareness" — cái cảm giác biết đồng nghiệp đang làm gì chỉ qua ngồi gần nhau.

Bù lại: write-up ngắn cuối ngày (đã làm gì, đang blocked gì, plan ngày mai), async video licking thay vì meeting khi context phức tạp, document decisions ở chỗ ai cũng tìm được.

## Bảo vệ energy, không phải time

Remote có nghịch lý: bạn có nhiều giờ hơn (không commute) nhưng thường cảm thấy kiệt sức hơn.

Nguyên nhân: "always on" culture. Giải pháp: hard stop giờ kết thúc làm việc, không check slack sau giờ đó. Consistency quan trọng hơn flexibility.`,
    category: 'Life',
    tags: ['Remote', 'Work', 'Productivity'],
    author: AUTHORS.bob,
    date: '2024-03-05',
    readTime: 7,
  },

  // ── SCIENCE (3 bài) ───────────────────────────────────────
  {
    id: 8,
    title: 'Neuroplasticity: Não bộ thay đổi như thế nào khi học',
    excerpt:
      'Trái với quan niệm cũ, não người không "cố định" sau tuổi trưởng thành. Mỗi lần bạn học điều gì mới, các synapse thực sự thay đổi.',
    content: `## Myth cũ: Não cứng sau tuổi 25

Trong hàng thập kỷ, khoa học thần kinh tin rằng não người trưởng thành không tạo được neuron mới và không thay đổi cấu trúc đáng kể.

Điều này **sai hoàn toàn**.

## Neuroplasticity là gì?

Neuroplasticity là khả năng của não bộ thay đổi cấu trúc và chức năng do học tập và kinh nghiệm.

Có 2 loại:
1. **Synaptic plasticity**: Kết nối giữa neurons mạnh lên hoặc yếu đi tùy vào tần suất sử dụng ("neurons that fire together, wire together")
2. **Neurogenesis**: Tạo neuron mới (xảy ra ở hippocampus — vùng liên quan đến học tập và memory)

## Ứng dụng thực tế cho việc học

**Spaced repetition** khai thác synaptic plasticity: ôn lại đúng lúc synapse sắp "quên" sẽ tăng cường kết nối hiệu quả hơn ôn liên tục.

**Sleep** là khi não "consolidate" memory: pruning synapses yếu, tăng cường synapses mạnh. Thiếu ngủ = học kém hiệu quả, không phải vì mệt mà vì não không có thời gian xử lý.

**Stress mãn tính** làm thu nhỏ hippocampus — ảnh hưởng trực tiếp đến khả năng học.`,
    category: 'Science',
    tags: ['Neuroscience', 'Learning', 'Brain'],
    author: AUTHORS.bob,
    date: '2024-01-20',
    readTime: 8,
  },
  {
    id: 9,
    title: 'Quantum Computing: Giải thích đơn giản nhất có thể',
    excerpt:
      'Máy tính quantum không phải "nhanh hơn" máy tính thường. Chúng giải quyết một loại bài toán khác hoàn toàn, theo cách mà máy tính cổ điển không thể làm được.',
    content: `## Bit vs Qubit

Máy tính cổ điển dùng **bits**: mỗi bit là 0 hoặc 1.

Máy tính quantum dùng **qubits**: mỗi qubit có thể là 0, 1, hoặc **superposition** (đồng thời vừa là 0 vừa là 1) — cho đến khi bạn đo nó.

## Superposition — không phải "hai việc cùng lúc"

Sai lầm phổ biến: nghĩ qubit "xử lý 0 và 1 đồng thời, nên nhanh gấp đôi".

Thực tế phức tạp hơn: superposition là một **trạng thái xác suất**. Khi đo, qubit collapse về 0 hoặc 1 theo xác suất. Bản thân việc đo đã thay đổi trạng thái.

## Entanglement — thứ thực sự mạnh

Hai qubit có thể **entangled**: trạng thái của chúng liên kết với nhau. Đo một qubit ngay lập tức xác định trạng thái của qubit kia, dù chúng cách nhau bao xa.

Quantum algorithms khai thác cả superposition và entanglement để giải các bài toán như:
- Factoring số lớn (phá mã RSA — lý do quantum computing là mối lo ngại về security)
- Optimization problems
- Mô phỏng phân tử (drug discovery)

Với bài toán thông thường (sắp xếp mảng, chạy web app)? Máy tính cổ điển vẫn tốt hơn.`,
    category: 'Science',
    tags: ['Physics', 'Computing', 'Future'],
    author: AUTHORS.bob,
    date: '2024-02-25',
    readTime: 9,
  },
  {
    id: 10,
    title: 'CRISPR và tương lai của y học cá nhân hóa',
    excerpt:
      'CRISPR-Cas9 cho phép chỉnh sửa DNA với độ chính xác chưa từng có. Trong 10 năm tới, đây có thể là cách chữa trị hàng trăm bệnh di truyền.',
    content: `## CRISPR là gì?

CRISPR (Clustered Regularly Interspaced Short Palindromic Repeats) ban đầu là hệ thống miễn dịch của vi khuẩn — cách chúng "ghi nhớ" và tiêu diệt virus.

Năm 2012, Jennifer Doudna và Emmanuelle Charpentier (Nobel Prize 2020) phát hiện có thể **tái mục đích** CRISPR thành công cụ chỉnh sửa gene.

## Cơ chế đơn giản

1. **Guide RNA** (gRNA) được thiết kế để khớp với đoạn DNA cần chỉnh sửa
2. gRNA dẫn **Cas9 protein** (enzyme "kéo cắt") đến đúng vị trí
3. Cas9 cắt đứt chuỗi DNA
4. Tế bào tự sửa chữa — và trong quá trình đó, ta có thể chèn, xóa, hoặc thay thế đoạn gene

## Ứng dụng hiện tại

**Đã được FDA phê duyệt (2023)**: Casgevy — điều trị sickle cell disease và beta-thalassemia. Đây là liệu pháp CRISPR đầu tiên được phê duyệt cho người.

**Đang thử nghiệm lâm sàng**: Ung thư máu, HIV, mù bẩm sinh, Huntington's disease.

## Vấn đề đạo đức

Chỉnh sửa **somatic cells** (tế bào thường): được chấp nhận y tế.
Chỉnh sửa **germline** (trứng/tinh trùng/phôi): thay đổi sẽ di truyền sang con cái — cực kỳ tranh cãi về mặt đạo đức.`,
    category: 'Science',
    tags: ['Biology', 'Medicine', 'Technology'],
    author: AUTHORS.carol,
    date: '2024-03-18',
    readTime: 8,
  },
];
