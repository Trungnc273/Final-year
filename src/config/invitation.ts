export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  category: string;
  aspectRatio: string;
}

export const invitation = {
  graduateName: 'NGUYỄN HỒNG HẠNH',
  familyName: 'Nguyễn',
  shortName: 'Hồng Hạnh',
  graduationYear: '2026',
  graduationContext: 'Tốt nghiệp lớp 12',
  school: 'Trường THPT Chuyên Hà Giang',
  ceremonyDate: '2026-10-03',
  ceremonyDateFormatted: '03/10/2026',
  ceremonyTime: '10:30',
  ceremonyEndTime: '12:00',
  ceremonyTimeDisplay: '10:30 – 12:00',
  ceremonyStartAt: '2026-10-03T10:30:00+07:00',
  ceremonyEndAt: '2026-10-03T12:00:00+07:00',
  googleMapsUrl: 'https://maps.app.goo.gl/Jh46wc4Pf2cr67wX6',
  backgroundMusic: '/sounds/nhac_nen.mp3',
  photos: {
    cover: '/imgs/1790103137299_260097608859597476_5145456347083508304_8a062457ac869019bf3ca07e482bf3bd.jpg',
    hero: '/imgs/1790103137286_260097608859597476_5145456347083508304_5c86546411cd8f466d021caf529a0200.jpg',
    intro: '/imgs/1790103137218_260097608859597476_5145456347083508304_da403d38f5e448d8fe520b4a78b3cef4.jpg',
    story: '/imgs/1790103137270_260097608859597476_5145456347083508304_8c3667a743b33ee432bbadd6fcba733e.jpg',
    message: '/imgs/1790103137251_260097608859597476_5145456347083508304_8a8bb6cc2abe29f13d33bc48eb814641.jpg',
    gallery: [
      { id: 'photo-stairs', src: '/imgs/1790103137286_260097608859597476_5145456347083508304_5c86546411cd8f466d021caf529a0200.jpg', title: 'Bậc thềm trưởng thành', subtitle: 'Một chặng đường tuổi học trò khép lại', category: 'Kỷ niệm', aspectRatio: '2/3' },
      { id: 'photo-smile', src: '/imgs/1790103137299_260097608859597476_5145456347083508304_8a062457ac869019bf3ca07e482bf3bd.jpg', title: 'Nụ cười ngày tốt nghiệp', subtitle: 'Niềm vui trước một hành trình mới', category: 'Chân dung', aspectRatio: '2/3' },
      { id: 'photo-flowers-look', src: '/imgs/1790103137218_260097608859597476_5145456347083508304_da403d38f5e448d8fe520b4a78b3cef4.jpg', title: 'Bó hoa ngày chia tay', subtitle: 'Lưu giữ những khoảnh khắc đáng nhớ', category: 'Kỷ niệm', aspectRatio: '2/3' },
      { id: 'photo-nature', src: '/imgs/1790103137270_260097608859597476_5145456347083508304_8c3667a743b33ee432bbadd6fcba733e.jpg', title: 'Thanh xuân dưới mái trường', subtitle: 'Nhớ những ngày tháng học trò', category: 'Thanh xuân', aspectRatio: '2/3' },
      { id: 'photo-contemplation', src: '/imgs/1790103137251_260097608859597476_5145456347083508304_8a8bb6cc2abe29f13d33bc48eb814641.jpg', title: 'Khoảnh khắc lắng đọng', subtitle: 'Gửi lời cảm ơn những người luôn kề bên', category: 'Tri ân', aspectRatio: '2/3' }
    ] as GalleryPhoto[]
  }
};
