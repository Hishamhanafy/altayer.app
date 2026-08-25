enum KycDocType {
  nationalIdFront,
  nationalIdBack,
  driverLicenseFront,
  driverLicenseBack,
  carLicenseFront,
  carLicenseBack,
  criminalRecord,
  carFrontPhoto,
  carBackPhoto,
  carInteriorPhoto,
  captainSelfie,
}

enum KycStatus {
  notUploaded,
  pendingReview,
  approved,
  needsAction,
}

extension KycDocTypeExtension on KycDocType {
  String get title {
    switch (this) {
      case KycDocType.nationalIdFront:
        return 'بطاقة الرقم القومي (الوجه الأمامي)';
      case KycDocType.nationalIdBack:
        return 'بطاقة الرقم القومي (الوجه الخلفي)';
      case KycDocType.driverLicenseFront:
        return 'رخصة القيادة (الوجه الأمامي)';
      case KycDocType.driverLicenseBack:
        return 'رخصة القيادة (الوجه الخلفي)';
      case KycDocType.carLicenseFront:
        return 'رخصة تسيير المركبة (الوجه الأمامي)';
      case KycDocType.carLicenseBack:
        return 'رخصة تسيير المركبة (الوجه الخلفي)';
      case KycDocType.criminalRecord:
        return 'صحيفة الحالة الجنائية (فيش وتشبيه حديث)';
      case KycDocType.carFrontPhoto:
        return 'صورة أمامية للسيارة (توضح اللوحة)';
      case KycDocType.carBackPhoto:
        return 'صورة خلفية للسيارة';
      case KycDocType.carInteriorPhoto:
        return 'صورة الفرش والصالون الداخلي';
      case KycDocType.captainSelfie:
        return 'صورة شخصية رسمية للكابتن (سيلفي)';
    }
  }

  String get category {
    switch (this) {
      case KycDocType.nationalIdFront:
      case KycDocType.nationalIdBack:
      case KycDocType.captainSelfie:
        return 'الهوية الشخصية';
      case KycDocType.driverLicenseFront:
      case KycDocType.driverLicenseBack:
      case KycDocType.criminalRecord:
        return 'رخص القيادة والأمان';
      case KycDocType.carLicenseFront:
      case KycDocType.carLicenseBack:
      case KycDocType.carFrontPhoto:
      case KycDocType.carBackPhoto:
      case KycDocType.carInteriorPhoto:
        return 'بيانات وفحص المركبة';
    }
  }

  String get instructions {
    switch (this) {
      case KycDocType.nationalIdFront:
      case KycDocType.nationalIdBack:
        return 'ضع بطاقة الرقم القومي في إطار الكاميرا وتأكد من وضوح الصورة والرقم القومي (14 رقماً) وتاريخ السريان.';
      case KycDocType.driverLicenseFront:
      case KycDocType.driverLicenseBack:
        return 'تأكد من أن رخصة القيادة سارية ودرجة الرخصة واضحة (مهنية أو خاصة).';
      case KycDocType.carLicenseFront:
      case KycDocType.carLicenseBack:
        return 'تأكد من وضوح أرقام الشاسيه والموتور ورقم اللوحة المعدنية وتاريخ انتهاء الضريبة.';
      case KycDocType.criminalRecord:
        return 'يجب أن يكون الفيش صادراً خلال آخر 3 أشهر وموجهاً لشركة النقل الذكي.';
      case KycDocType.carFrontPhoto:
      case KycDocType.carBackPhoto:
        return 'التقط صورة نهارية واضحة تظهر فيها لوحات السيارة والطلاء العام بدون انعكاسات.';
      case KycDocType.carInteriorPhoto:
        return 'صورة للصالون والمقاعد توضح نظافة الفرش ومكيف الهواء.';
      case KycDocType.captainSelfie:
        return 'انظر مباشرة للكاميرا بدون نظارات شمسية أو قبعة بإضاءة جيدة.';
    }
  }

  String get icon {
    switch (this) {
      case KycDocType.nationalIdFront:
      case KycDocType.nationalIdBack:
        return '🪪';
      case KycDocType.driverLicenseFront:
      case KycDocType.driverLicenseBack:
        return '💳';
      case KycDocType.criminalRecord:
        return '⚖️';
      case KycDocType.carLicenseFront:
      case KycDocType.carLicenseBack:
      case KycDocType.carFrontPhoto:
      case KycDocType.carBackPhoto:
      case KycDocType.carInteriorPhoto:
        return '🚗';
      case KycDocType.captainSelfie:
        return '🤳';
    }
  }
}

class KycDocumentItem {
  final KycDocType type;
  KycStatus status;
  String? imagePath;
  String? expiryDate;
  String? rejectionNote;

  KycDocumentItem({
    required this.type,
    this.status = KycStatus.notUploaded,
    this.imagePath,
    this.expiryDate,
    this.rejectionNote,
  });
}

class CaptainRegistrationData {
  String fullName;
  String nationalId;
  String phone;
  String city;
  String vehicleType;
  String makeModelYear;
  String plateLetters;
  String plateNumbers;
  String carColor;
  String emergencyName;
  String emergencyPhone;
  String payoutType; // INSTAPAY, VODAFONE_CASH, BANK
  String payoutAddress;

  CaptainRegistrationData({
    this.fullName = '',
    this.nationalId = '',
    this.phone = '',
    this.city = 'القاهرة الكبرى',
    this.vehicleType = 'ملاكي حديث',
    this.makeModelYear = '',
    this.plateLetters = '',
    this.plateNumbers = '',
    this.carColor = 'أبيض',
    this.emergencyName = '',
    this.emergencyPhone = '',
    this.payoutType = 'INSTAPAY',
    this.payoutAddress = '',
  });
}
