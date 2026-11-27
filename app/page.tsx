import Link from 'next/link';
import {categories} from '@/lib/categories';

const teacherBenefits = [
  { icon: '✍️', title: 'AI hỗ trợ chấm bài', text: 'Phân tích theo đáp án và tiêu chí, gợi ý điểm và nhận xét. Giáo viên kiểm tra và quyết định điểm cuối cùng.' },
  { icon: '🧭', title: 'AI hỗ trợ soạn giáo án', text: 'Tạo kế hoạch bài dạy, câu hỏi, ví dụ, phiếu học tập và tài liệu theo từng đối tượng học sinh.' },
  { icon: '🏫', title: 'Quản lý lớp học', text: 'Quản lý nhiều lớp, nhóm học tập, sĩ số, chuyên cần, tiến độ và kết quả từng học sinh.' },
  { icon: '🗂️', title: 'Ngân hàng đề kiểm tra', text: 'Tạo câu hỏi trắc nghiệm và tự luận, phân loại mức độ, đáp án và hướng dẫn chấm.' },
  { icon: '📊', title: 'Phân tích chất lượng giáo dục', text: 'Theo dõi tiến bộ, phát hiện nội dung còn yếu và hỗ trợ báo cáo định kỳ.' },
  { icon: '📚', title: 'Kho học liệu số', text: 'Lưu trữ, phân loại, tìm kiếm và chia sẻ giáo án, bài giảng và tài liệu theo quyền.' },
  { icon: '⚙️', title: 'Quản trị và điều hành', text: 'Quản lý thành viên, phân công nhiệm vụ, quyền truy cập và lịch sử hoạt động.' }
];

const classroomFeatures = [
  { icon: '👥', title: 'Nhóm học tập', status: 'Sắp kích hoạt' },
  { icon: '🎥', title: 'Phòng học video', status: 'Sắp kích hoạt' },
  { icon: '🖼️', title: 'Hình ảnh và học liệu', status: 'Sắp kích hoạt' },
  { icon: '📝', title: 'Giao và nhận bài tập', status: 'Sắp kích hoạt' },
  { icon: '💬', title: 'Trao đổi và thảo luận', status: 'Sắp kích hoạt' },
  { icon: '📈', title: 'Thống kê hoạt động', status: 'Sắp kích hoạt' }
];

export default function Home(){return <main>
<section className="hero"><div className="hero-content"><span className="eyebrow">DIGITAL LEARNING · HTS</span><h1>Tri thức số cho mọi người.<br/><em>Học tập không giới hạn.</em></h1><p>Nền tảng học tập mở, kết nối tri thức, công nghệ và cộng đồng. Học mọi lúc, mọi nơi, theo nhu cầu của mỗi người.</p><div className="actions"><a className="button primary" href="#linh-vuc">Khám phá lĩnh vực học tập</a><a className="button secondary" href="#gioi-thieu">Tìm hiểu đề án</a></div><div className="hero-note">7 lĩnh vực học tập; quyền truy cập được xác định riêng theo từng lĩnh vực. Tài khoản và Pi không bắt buộc cho nội dung công khai.</div></div><div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="book">✦<span>HTS</span><small>LEARN · CONNECT · GROW</small></div><div className="float-card card-a">📖 <span>Tri thức mở</span></div><div className="float-card card-b">🌐 <span>Kết nối cộng đồng</span></div></div></section>
<section className="section" id="linh-vuc"><div className="section-heading"><div><span className="eyebrow">LEARNING PATHS</span><h2>Các lĩnh vực học tập</h2></div><p>Lựa chọn lĩnh vực phù hợp với nhu cầu và hành trình phát triển của bạn.</p></div><div className="category-grid">{categories.map(c=><article className="category" key={c.slug}><div className="category-top"><span className="category-icon">{c.icon}</span><span className={c.isFree?'tag open':'tag'}>{c.isFree?'Học tập miễn phí':'Cần tài khoản'}</span></div><h3>{c.title}</h3><p>{c.subtitle}</p><Link href={`/hoc-tap/${c.slug}`}>{c.accessPolicy === 'public'?'Vào học ngay':'Xem thông tin giới thiệu'} <span>↗</span></Link></article>)}</div></section>
<section className="teacher-section" id="quan-ly-giao-duc">
  <div className="teacher-heading">
    <div>
      <span className="eyebrow">DỊCH VỤ QUẢN TRỊ GIÁO DỤC</span>
      <h2>THẦY CÔ DẠY TỐT HƠN – NHẸ GÁNH CÔNG VIỆC – LÀM CHỦ CÔNG NGHỆ.</h2>
    </div>
    <p>HTS hỗ trợ giáo viên ứng dụng AI, quản lý lớp học, tổ chức giảng dạy và theo dõi kết quả học tập.</p>
  </div>
  <div className="teacher-grid">
    {teacherBenefits.map((item) => (
      <article className="teacher-card" key={item.title}>
        <span className="teacher-icon" aria-hidden="true">{item.icon}</span>
        <div><h3>{item.title}</h3><p>{item.text}</p></div>
      </article>
    ))}
  </div>
  <div className="classroom-block">
    <div>
      <span className="eyebrow">LỚP HỌC VÀ GIẢNG DẠY TRỰC TUYẾN</span>
      <h3>Phân hệ thiết kế trước – kích hoạt sau</h3>
    </div>
    <div className="classroom-grid">
      {classroomFeatures.map((item) => (
        <article className="classroom-card" key={item.title}>
          <span aria-hidden="true">{item.icon}</span>
          <strong>{item.title}</strong>
          <small>{item.status}</small>
        </article>
      ))}
    </div>
  </div>
  <div className="teacher-actions">
    <Link className="button primary" href="/yeu-cau-quan-tri">Đăng ký quản trị</Link>
    <span>Đăng ký quản trị cần tài khoản Pi và xét duyệt của Super Admin.</span>
  </div>
</section>
<section className="intro" id="gioi-thieu"><div><span className="eyebrow">ABOUT HTS</span><h2>Học tập suốt đời trong kỷ nguyên số</h2></div><p>Học Tập Số hướng tới xây dựng hệ sinh thái học tập số ứng dụng công nghệ và trí tuệ nhân tạo, hỗ trợ phổ cập tri thức, nâng cao trình độ, phát triển kỹ năng và thúc đẩy tinh thần tự học.</p></section>
<section className="section features" id="dinh-huong"><span className="eyebrow">ROADMAP</span><h2>Lộ trình phát triển</h2><div className="roadmap">{['Trang chủ, cấu trúc website và quản trị','Cơ sở dữ liệu, tài khoản và phân quyền','Lĩnh vực học tập, bài giảng, thư viện và thi','Theo dõi học tập, thống kê và báo cáo','Mạng xã hội và tương tác cộng đồng','Sàn thương mại điện tử','Nghiên cứu tích hợp Pi Network và Token HTS','Kiểm thử, bảo mật và triển khai chính thức'].map((x,i)=><div className="road-item" key={x}><b>{String(i+1).padStart(2,'0')}</b><span>{x}</span></div>)}</div></section>
</main>}
