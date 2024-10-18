SELECT
    A.id AS "Sipariş No",
    F.tarih AS "Giriş Tarihi",
    DATE(C.zaman) AS "Çıkış Tarihi",
    DATEDIFF(F.tarih, C.zaman) AS "Fark",
    CONCAT((100 - (DATEDIFF(C.zaman, F.tarih) * 10))) AS "% Çıkış uyum oranı",
    T.unvan,
    S.*
    FROM
    satisceki C
LEFT JOIN
    satissiparis S ON S.id = C.siparisid
LEFT JOIN
    satissiparisa A ON A.id = S.satissiparisno
LEFT JOIN
    satisfisa F ON F.id = A.fisid
LEFT JOIN
    tblhesaplar T ON T.id = F.hesapno
WHERE
    F.tarih BETWEEN '2024-10-01' AND '2024-10-10';
