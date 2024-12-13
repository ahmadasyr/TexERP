SELECT
    A.id AS "Sipariş No",
    F.tarih AS "Giriş Tarihi",
    (F.tarih + INTERVAL 10 DAY) AS "Termin Tarihi",
    DATE(C.zaman) AS "Çıkış Tarihi",
    DATEDIFF((F.tarih + INTERVAL 10 DAY),C.zaman ) AS "Fark",
    CASE 
    WHEN DATEDIFF(C.zaman, F.tarih) <= 10 THEN 
        100
    ELSE 
        CONCAT((200 - (DATEDIFF(C.zaman, F.tarih) * 10))) 
	END AS "% Çıkış uyum oranı",
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
    F.tarih BETWEEN '2024-07-01' AND '2024-07-31';
