import { DTC_MODULES, DTC_WORKFLOW } from "@/lib/dtc/catalog";

export default function DtcDashboard() {
  return (
    <div className="dtc-page">
      <section className="dtc-hero" aria-labelledby="dtc-title">
        <div>
          <div className="dtc-kicker">Hệ sinh thái HỌC TẬP SỐ · Phân hệ DTC</div>
          <h1 id="dtc-title">Trung tâm Kỹ thuật số</h1>
          <p>
            Không gian định hướng cho giao dịch, ký số và trao đổi tài liệu
            được bảo mật. DTC kế thừa tài khoản, phân quyền và hạ tầng máy chủ
            của HTS; các nghiệp vụ bảo mật chuyên sâu được phát triển thành
            phân hệ riêng.
          </p>
        </div>
        <div className="dtc-mark" aria-hidden="true">DTC</div>
      </section>

      <div className="dtc-notice" role="status">
        <strong>Bản nền tảng khởi tạo – chưa mở nghiệp vụ thật.</strong> Màn hình
        này mới là lớp giao diện và cấu trúc phân hệ. Chưa thực hiện tạo khóa,
        ký tài liệu, mã hóa, gửi tệp hoặc lưu dữ liệu giao dịch. Các chức năng
        chỉ được kích hoạt sau khi hoàn thiện xác thực máy chủ, kiểm soát quyền,
        rà soát mật mã và kiểm thử an ninh.
      </div>

      <section className="dtc-section" aria-labelledby="dtc-modules">
        <div className="dtc-section-head">
          <div>
            <h2 id="dtc-modules">Các nhóm chức năng</h2>
            <p>Cấu trúc dự kiến của Trung tâm Kỹ thuật số</p>
          </div>
        </div>
        <div className="dtc-grid">
          {DTC_MODULES.map((item) => (
            <article className="dtc-card" key={item.id}>
              <div className="dtc-card-icon" aria-hidden="true">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="dtc-status">{item.statusLabel}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="dtc-section" aria-labelledby="dtc-flow-title">
        <div className="dtc-section-head">
          <div>
            <h2 id="dtc-flow-title">Quy trình nghiệp vụ dự kiến</h2>
            <p>Luồng tổng quát; chưa phải chức năng đang hoạt động</p>
          </div>
        </div>
        <div className="dtc-flow">
          {DTC_WORKFLOW.map((step) => (
            <div className="dtc-step" key={step.number}>
              <strong>{step.number}. {step.title}</strong>
              {step.description}
            </div>
          ))}
        </div>
      </section>

      <div className="dtc-footnote">
        <strong>Nguyên tắc tích hợp:</strong> dùng chung danh tính HTS và cơ chế
        phân quyền đã được máy chủ xác minh; khóa ký và khóa mã hóa độc lập;
        Pi Wallet chỉ phục vụ liên kết/xác minh danh tính, không phải khóa mã
        hóa. Máy chủ không nhận khóa riêng hoặc nội dung bản rõ. Không sử dụng
        dữ liệu mật, tài liệu quân sự hạn chế hoặc hồ sơ cá nhân thật trong giai
        đoạn thử nghiệm.
      </div>
    </div>
  );
}
