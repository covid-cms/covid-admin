export default {
    content: `<p>Chào các bạn,</p>
    <p><strong>Microservice</strong> đang là chủ đề hot hiện nay, bạn có thể dễ dàng bắt gặp các câu hỏi về microservice như “<strong>Microservice là gì</strong>“, “<strong>Ưu điểm của microservice</strong>“, “Khi nào thì triển khai phần mềm theo kiến trúc microservice”,… Vậy rốt cuộc microservice là gì mà người ta lại nhắc đến nhiều như vậy. Mình sẽ cùng nhau đi tìm hiểu trong bài viết ngắn gọn này nhé.</p>
    <p>Mục lục</p>
    <ul>
        <li>
            <a href="https://phambinh.net/bai-viet/kien-truc-microservice-la-gi-cung-tim-hieu-trong-10-phut/?preview_id=3057&amp;preview_nonce=8a209ce94a&amp;preview=true&amp;_thumbnail_id=3098#I_Kien_truc_monolithic">I. Kiến trúc monolithic</a>
            <ul>
                <li><a href="https://phambinh.net/bai-viet/kien-truc-microservice-la-gi-cung-tim-hieu-trong-10-phut/?preview_id=3057&amp;preview_nonce=8a209ce94a&amp;preview=true&amp;_thumbnail_id=3098#11_Uu_diem_cua_kien_truc_monolithic">1.1 Ưu điểm của kiến trúc monolithic</a></li>
                <li><a href="https://phambinh.net/bai-viet/kien-truc-microservice-la-gi-cung-tim-hieu-trong-10-phut/?preview_id=3057&amp;preview_nonce=8a209ce94a&amp;preview=true&amp;_thumbnail_id=3098#12_Nhuoc_diem_kien_truc_monolithic">1.2 Nhược điểm kiến trúc monolithic</a></li>
            </ul>
        </li>
        <li>
            <a href="https://phambinh.net/bai-viet/kien-truc-microservice-la-gi-cung-tim-hieu-trong-10-phut/?preview_id=3057&amp;preview_nonce=8a209ce94a&amp;preview=true&amp;_thumbnail_id=3098#II_Kien_truc_microservice">II. Kiến trúc microservice</a>
            <ul>
                <li><a href="https://phambinh.net/bai-viet/kien-truc-microservice-la-gi-cung-tim-hieu-trong-10-phut/?preview_id=3057&amp;preview_nonce=8a209ce94a&amp;preview=true&amp;_thumbnail_id=3098#21_Uu_diem_cua_kien_truc_microservice">2.1 Ưu điểm của kiến trúc microservice</a></li>
                <li><a href="https://phambinh.net/bai-viet/kien-truc-microservice-la-gi-cung-tim-hieu-trong-10-phut/?preview_id=3057&amp;preview_nonce=8a209ce94a&amp;preview=true&amp;_thumbnail_id=3098#22_Nhuoc_diem_cua_kien_truc_microservice">2.2 Nhược điểm của kiến trúc microservice</a></li>
            </ul>
        </li>
        <li><a href="https://phambinh.net/bai-viet/kien-truc-microservice-la-gi-cung-tim-hieu-trong-10-phut/?preview_id=3057&amp;preview_nonce=8a209ce94a&amp;preview=true&amp;_thumbnail_id=3098#III_Dung_de_cac_uu_diem_cua_microservice_lam_loa_mat">III. Đừng để các ưu điểm của microservice làm lóa mắt</a></li>
        <li><a href="https://phambinh.net/bai-viet/kien-truc-microservice-la-gi-cung-tim-hieu-trong-10-phut/?preview_id=3057&amp;preview_nonce=8a209ce94a&amp;preview=true&amp;_thumbnail_id=3098#IV_Ban_can_gi_de_xay_dung_phan_mem_theo_kien_truc_microservice">IV. Bạn cần gì để xây dựng phần mềm theo kiến trúc microservice</a></li>
        <li><a href="https://phambinh.net/bai-viet/kien-truc-microservice-la-gi-cung-tim-hieu-trong-10-phut/?preview_id=3057&amp;preview_nonce=8a209ce94a&amp;preview=true&amp;_thumbnail_id=3098#IV_Ket_luan">IV. Kết luận</a></li>
    </ul>
    <h2><strong>I. KIẾN TRÚC MONOLITHIC</strong></h2>
    <p><i>Để hiểu rõ về microservice cũng như có cái để so sánh với microservice thì mình sẽ giới thiệu tới các bạn kiến trúc monolithic trước.</i></p>
    <p>Monolithic là kiến trúc phần mềm dạng nguyên khối, nghĩa là mọi tính năng sẽ nằm trong một project. Giả sử mình có một project web bán hàng triển khai theo kiến trúc monolithic, thì các module như khách hàng, đơn hàng, sản phẩm,… sẽ được gói gọn trong project đó.</p>
    <p>Nếu bạn chưa từng biết tới microservice, thì khả năng các dự án bạn từng triển khai đều là kiến trúc monolithic.</p>
    <h3><strong>1.1 Ưu điểm của kiến trúc monolithic</strong></h3>
    <p>Có thể thấy ngay một số ưu điểm của kiến trúc monolithic như sau:</p>
    <ul>
        <li><strong>Có cách phát triển đơn giản</strong>: Dự án theo kiểu monolithic thì mọi thứ đều tập trung tại một chỗ, việc setup môi trường để code cũng như code thêm cho dự án sẽ diễn ra nhanh chóng và đơn giản. Đơn giản ở đây là đơn giản hơn kiến trúc microservice mà mình sắp giới thiệu ở phần dưới, chứ chúng ta đều biết rằng phát triển phần mềm là công việc chẳng hề đơn giản cho dù sử dụng kiến trúc nào đi nữa.</li>
        <li><strong>Dễ dàng deploy</strong>: Với monolithic dự án được đóng gói thành một cục gọn gàng, nhờ đó mà quá trình deploy cũng dễ dàng. Nhưng cũng như tiêu chí trước, nó chỉ đơn giản hơn microservice thôi.</li>
        <li><strong>Hệ thống được xây dựng dựa trên một công nghệ</strong>: Do kiến trúc nguyên khối, nên phần mềm triển khai theo cấu trúc này sẽ chỉ giới hạn trong một số công nghệ nhất định, bạn không cần phải hiểu biết quá nhiều để làm việc với phần mềm tuân theo kiến trúc này. Tiêu chí này đôi khi cũng là nhược điểm, cụ thể mình sẽ trình bày ở phần nhược điểm bên dưới.</li>
    </ul>
    <h3><strong>1.2 Nhược điểm kiến trúc monolithic</strong></h3>
    <p>Bên cạnh ưu điểm, kiến trúc monolithic có một số nhược điểm chí mạng sau:</p>
    <ul>
        <li><strong>Một tính năng thay đổi là coi như cả thống thay đổi</strong>: Theo kiến trúc monolithic thì dự án của bạn được chia thành bao nhiêu module, có cấu trúc linh hoạt đến mấy thì bản chất nó vẫn là nguyên khối. Nên khi một tính năng thay đổi thì coi như là cả hệ thống thay đổi, hay nói cách khác là phần mềm triển khai theo kiến trúc monolithic sẽ thường xuyên bị thay đổi. Việc thường xuyên thay đổi sẽ khiến bạn phải deploy lại nhiều lần, trong lúc deploy ít nhiều gì hệ thống cũng sẽ bị tạm dừng. Vậy nếu tần xuất deploy càng cao thì thời gian tạm dừng của hệ thống cũng càng lớn, chưa kể trong lúc deploy có thể có rủi ro. Với những dự án lớn hay dự án quan trọng thì việc cả hệ thống bị tạm dừng có thể gây ra những thiệt hại lớn.</li>
        <li><strong>Càng lâu thì dự án càng cồng kềnh</strong>: Theo thời gian, các tính năng sẽ “tích tiểu thành đại” gây khó khăn trong việc nắm bắt business logic, khó khăn trong việc bảo trì.</li>
        <li><strong>Giới hạn công nghệ</strong>: Vì chỉ được xây dựng trong một số công nghệ nhất định, nên các tính năng sẽ bị giới hạn trong phạm vi công nghệ đó. Ví dụ bạn có một sản phẩm làm bằng PHP, thì sẽ khó làm các tính năng realtime (thời gian thực) hay bất đồng bộ.</li>
    </ul>
    <h2><strong>II. KIẾN TRÚC MICROSERVICE</strong></h2>
    <p>Microservice là kiến trúc có triết lý thiết kế ngược lại hoàn toàn so với kiến trúc monolithic nêu trên. Thay vì gom tất tần tật tính năng vào trong một dự án, microservice chia dự án thành nhiều service nhỏ.</p>
    <p>Quay trở lại ví dụ về một trang web bán hàng có các module sản phẩm, khác hàng, đơn hàng,… thì mỗi module đó có thể được tách thành một project riêng, hay theo kiến trúc microservice thì chúng được gọi là các service.</p>
    <p>Các service trong kiến trúc microservice là độc lập với nhau, chúng có thể có kiến trúc khác nhau, sử dụng công nghệ khác nhau hoặc thậm chí có database riêng. Chúng trao đổi thông tin với nhau thông qua môi trường mạng (có thể bằng <a href="https://phambinh.net/bai-viet/restful-api-la-gi-cung-tim-hieu-ve-restful-api/">endpoint restful API</a> hoặc các message queue).</p>
    <p>Một trong những điều cực kỳ quan trọng giữa các service trong kiến trúc microservice là chúng phải hiểu nhau đang “nói” gì. Để làm được điều này, buộc các developer phải thống nhất trước cách mà chúng sẽ giao tiếp với nhau như: giao tiếp qua phương thức nào (restful API hay message queue), kiểu dữ liệu nào (JSON hay XML), cấu trúc dữ liệu ra sao…</p>
    <p>Bạn có thể xem hình ảnh dưới đây để hiểu hơn về kiến trúc microservice.</p>
    <figure class="image ck-widget" contenteditable="false">
        <img src="https://i1.wp.com/phambinh.net/wp-content/uploads/2020/04/Untitled.png?resize=553%2C283&amp;ssl=1" alt="" srcset="https://i1.wp.com/phambinh.net/wp-content/uploads/2020/04/Untitled.png?w=802&amp;ssl=1 802w, https://i1.wp.com/phambinh.net/wp-content/uploads/2020/04/Untitled.png?resize=300%2C154&amp;ssl=1 300w, https://i1.wp.com/phambinh.net/wp-content/uploads/2020/04/Untitled.png?resize=150%2C77&amp;ssl=1 150w, https://i1.wp.com/phambinh.net/wp-content/uploads/2020/04/Untitled.png?resize=768%2C395&amp;ssl=1 768w, https://i1.wp.com/phambinh.net/wp-content/uploads/2020/04/Untitled.png?resize=696%2C358&amp;ssl=1 696w" sizes="100vw" width="553">
        <figcaption class="ck-editor__editable ck-editor__nested-editable ck-hidden ck-placeholder" data-placeholder="Enter image caption" contenteditable="true"><br data-cke-filler="true"></figcaption>
    </figure>
    <p>Hình ảnh trên mô tả cho một hệ thống shop online, với mỗi một hình lục giác màu xanh là đại diện cho một service, các đường thẳng màu xám thì đại diện cho luồng dữ liệu mà chúng sẽ trao đổi với nhau.</p>
    <h3><strong>2.1 Ưu điểm của kiến trúc microservice</strong></h3>
    <p>Dựa trên việc chia nhỏ hệ thống thành nhiều service riêng biệt, kiến trúc microservice có những ưu điểm sau:</p>
    <ul>
        <li><strong>Các service có thể được bảo trì độc lập</strong>: Các service là riêng biệt, vì vậy khi có một service được bảo trì nó không làm ảnh hưởng tới các service khác. Lưu ý, không ảnh hưởng ở đây là không gây “chết” các service khác nếu chẳng may service đang bảo trì gặp sự cố, chứ không phải là thiếu service mà hệ thống vẫn hoạt động đầy đủ tính năng.</li>
        <li><strong>Dễ dàng nắm bắt các business logic</strong>: Mỗi service xử lý một nghiệp vụ riêng, vì vậy mà ta có thể dễ dàng nắm bắt được các business logic.</li>
        <li><strong>Áp dụng được nhiều công nghệ</strong>: Mỗi service được coi như một dự án riêng, vì vậy mà chúng có thể sử dụng các công nghệ (như ngôn ngữ lập trình, database) khác nhau. Chúng chỉ cần đảm bảo tuân theo chuẩn giao tiếp được đặt ra từ trước, còn bên trong chúng thực hiện ra sao và sử dụng công nghệ gì không ảnh hưởng tới các service còn lại. Ví dụ một trang web với phần lớn các service được viết bằng PHP, nhưng riêng service thực hiện gửi – nhận thông báo realtime lại được viết bằng NodeJS. Trên thực tế, một hệ thống phần mềm triển khai theo kiến trúc microservice mà có các service phát triển trên các nền công nghệ khác nhau là chuyện hết sức bình thường.</li>
        <li><strong>Dễ dàng mở rộng khi hệ thống trở nên phức tạp</strong>: Microservice có kiến trúc khá tương đồng với kiến trúc của một <a href="https://phambinh.net/bai-viet/tim-hieu-ve-he-thong-phan-tan/">hệ phân tán</a>, nên nó cũng có khả năng mở rộng theo chiều ngang. Hiểu nhanh, nếu bạn cần mở rộng hệ thống bạn chỉ cần bổ sung thêm service.</li>
    </ul>
    <h3><strong>2.2 Nhược điểm của kiến trúc microservice</strong></h3>
    <p>Bên cạnh những ưu điểm, kiến trúc microservice có các nhược điểm:</p>
    <ul>
        <li><strong>Có độ trễ cao</strong>: Các service giao tiếp với nhau thông qua môi trường mạng, nên sẽ có độ trễ cao hơn so với kiến trúc monolithic. Để giảm độ trễ xuống mức tối thiểu, buộc các developer phải thiết kế sao cho chúng chỉ thật sự gọi tới nhau khi cần, đây cũng là một bài toán khó khi thiết kế hệ thống theo kiến trúc microservice.</li>
        <li><strong>Khó phát triển</strong>: Để có thể phát triển thì các developer phải kéo toàn bộ hệ thống về máy local để phát triển, trong khi một hệ thống microservice rất phức tạp, khó mà giả lập được trên môi trường local. Nhiều công ty khắc phục nhược điểm này bằng cách cài sẵn các service trên một server dev, nếu phát triển service nào thì chỉ kéo service đó về local trong khi vẫn giữ kết nối với các server dev. Ngoài ra với kiến trúc chia nhỏ và cách giao tiếp giữa các service cũng khiến các developer khó debug hơn.</li>
        <li><strong>Khó đảm bảo tính toàn vẹn dữ liệu</strong>: Vì dữ liệu có thể được lưu trên nhiều service khác nhau, nên khó có thể đảm bảo được tính toàn vẹn. Giả sử khi tạo đơn hàng, thì thông tin khách hàng phải tạo trước rồi mới tạo thông tin đơn hàng. Với kiến trúc monolithic, database được lưu tập trung và chúng thường được ràng buộc khóa ngoại để đảm bảo tính toàn vẹn. Nhưng với microservice khi “khách hàng” và “đơn hàng” là hai service khác nhau thì không có gì (về lý thuyết) để đảm bảo rằng dữ liệu phải được tạo ra theo đúng thứ tự cả.</li>
    </ul>
    <h2><strong>III. ĐỪNG ĐỂ CÁC ƯU ĐIỂM CỦA MICROSERVICE LÀM LÓA MẮT</strong></h2>
    <p>Đọc qua các ưu điểm “hoành tráng” của kiến trúc microservice, chắc nhiều bạn chắc sẽ muốn “đập cái dự án monolithic để xây lại theo kiến trúc microservice” quá, nên mình viết thêm mục này để cảnh tỉnh các bạn ý.</p>
    <p>Trước khi quyết định bạn có nên áp dụng kiến trúc microservice vào hệ thống, ít nhất bạn phải trả lời được các câu hỏi sau:</p>
    <p><strong>Hiện tại hoặc trong tương lai gần liệu bạn có gặp bất kỳ khó khắn nào với kiến trúc monolithic không?</strong></p>
    <p>Nếu câu trả lời là không, bạn chẳng có lý do gì để chuyển đổi cả. Nếu câu trả lời là có, thì bạn nên xem xét đến chi phí (thời gian, công sức, tiền bạc) để chuyển đổi sản phẩm từ monolithic sang microservice. Đương nhiên với mỗi dự án thì chi phí sẽ khác nhau nhưng chúng cũng có đặc điểm chung là THƯỜNG KHÔNG NHỎ.</p>
    <p><strong>Bạn (team, công ty) có sẵn sàng chấp nhận những nhược điểm của microservice không?</strong></p>
    <p>Về cơ bản, các nhược điểm của microservice không thể được khắc phục mà chỉ có thể được giảm xuống, thách thức đặt ra là bạn phải có đủ kiến thức và kinh nghiệm để có thể giảm nhược điểm của microservice xuống mức tối thiểu.</p>
    <p>Đọc thêm: <a href="https://phambinh.net/bai-viet/kinh-nghiem-lam-viec-duoc-tinh-nhu-the-nao/">Kinh nghiệm làm việc được tính như thế nào?</a></p>
    <p>Với nhược điểm <strong>độ trễ cao</strong>, hệ thống của bạn có thể sẽ tăng thêm vài giây khi xử lý dữ liệu nếu không có một thiết kế tốt về cách giao tiếp giữa các service.</p>
    <p>Với nhược điểm <strong>khó phát triển</strong>, công ty bạn có thể phải đầu tư thêm kha khá chi phí máy chủ để giả lập một môi trường dev, hoặc hàng loạt member trong team bạn sẽ phải … thay máy tính.</p>
    <p>Với nhược điểm <strong>khó đảm bảo tính toàn vẹn dữ liệu</strong>, database có thể bị mất mát, gây ra những exception khó hiểu. Nếu hệ thống của bạn ưu tiên tính toàn vẹn là trên hết (hệ thống bank, thanh toán) thì phải xem xét “cực kỳ kỹ lưỡng”.</p>
    <p>Ngoài các câu hỏi trên, thì còn có một lời khuyên vô cùng hữu ích khác là:</p>
    <p><strong>Đừng bao giờ bắt đầu dự án theo kiến trúc monolithic nhưng mục đích của bạn là lại kiến trúc microservice</strong> – <a href="https://www.innoq.com/en/staff/stefan-tilkov/">Stefan Tilkov</a></p>
    <p>Với các ưu điểm của monolithic, dự án của bạn có cách phát triển nhanh chóng và đơn giản. Nhưng nếu bạn cứ bị ảm ảnh bới kiến trúc microservice, sớm muộn gì bạn cũng sẽ làm phức tạp hóa các vấn đề trong kiến trúc monolithic.</p>
    <p><strong>Các hệ thống xây dựng theo kiến trúc microservice phần lớn đều xuất từ việc break một hệ thống monolithic, vì thế đừng start một dự án theo kiến trúc microservice ngay từ đầu</strong></p>
    <p>Vẻ đẹp của microservice thì ẩn dấu bên trong mono, bạn chỉ cần đợi đến khi nó được lộ diện ra.</p>
    <p><strong>Microservice khó mà thay thế được monolithic</strong></p>
    <p>Xu hướng hiện nay là làm hệ thống theo kiến trúc monolithic trước, sau khi hệ thống lớn, xuất phát các nhược điểm của kiến trúc monolithic thì người ta mới break sang kiến trúc microservice. Vì điều này nên nhiều người nghĩ rằng kiến trúc microservice là “đích đến” của kiến trúc monolithic. Nhưng không phải vậy, chưa có một kết luận nào cho thấy rằng microservice có thể thay thế hoàn toàn được kiến trúc monolithic. Bạn cũng cần phải lưu ý tới đặc điểm này.</p>
    <h2><strong>IV. BẠN CẦN GÌ ĐỂ XÂY DỰNG PHẦN MỀM THEO KIẾN TRÚC MICROSERVICE</strong></h2>
    <p>Sau tất cả, bạn quyết định triển khai dự án theo kiến trúc microservice, vậy bạn cần có gì?</p>
    <p><strong>Thứ nhất, bạn phải thành thạo xây dựng phần mềm theo kiến trúc monoliihic</strong>: Tất nhiên, cái kiến trúc mà bạn vẫn đang áp dụng đấy.</p>
    <p><strong>Thứ hai, các cơ chế xác thực</strong>: Cụ thể như <a href="https://en.wikipedia.org/wiki/JSON_Web_Token">Jwt</a>, <a href="https://en.wikipedia.org/wiki/OAuth">OAuth</a>.</p>
    <p><strong>Thứ ba, các công nghệ ảo hóa:</strong> cụ thể như <a href="https://www.docker.com/">docker</a>, nó sẽ giúp bạn đơn giản hóa việc setup môi trường cũng như deploy hệ thống theo kiến trúc microservice.</p>
    <p><strong>Thứ tư, restful API, message queue</strong>: <a href="https://phambinh.net/bai-viet/restful-api-la-gi-cung-tim-hieu-ve-restful-api/">Restful API</a> thì quen thuộc rồi, các message queue bạn có thể tham khảo <a href="https://www.rabbitmq.com/">rabbitmq</a>, <a href="https://kafka.apache.org/">apache kafka</a>.</p>
    <p>Trên là bốn yếu tố mà mình cho rằng là quan trọng nhất, bên cạnh đó khi làm thực tế chắc chắn sẽ cần thêm nhiều kiến thức khác nữa.</p>
    <h2><strong>IV. KẾT LUẬN</strong></h2>
    <p>Để hiểu kiến trúc microservice bạn chỉ mất có 10 phút, nhưng để áp dụng thì bạn cần … cả một bầu trời kiến thức.</p>
    <p><i>Thử tuyển 1 team 4 dev PHP intern thì tới mùa quýt năm sau cũng chưa triển khai được microservice nhé</i> – <a href="https://toidicodedao.com/2017/02/21/tong-quan-micro-service/">toidicodedao</a>.</p>
    <p>Bài viết tham khảo</p>
    <ul>
        <li><a href="https://kipalog.com/posts/Nhung-thac-mac-ki-thuat-quan-trong-ve-Microservices">https://kipalog.com/posts/Nhung-thac-mac-ki-thuat-quan-trong-ve-Microservices</a></li>
        <li><a href="https://dzone.com/articles/challenges-in-implementing-microservices">https://dzone.com/articles/challenges-in-implementing-microservices</a></li>
        <li><a href="https://kipalog.com/posts/Gioi-thieu-ve-Microservices-Part-1">https://kipalog.com/posts/Gioi-thieu-ve-Microservices-Part-1</a></li>
        <li><a href="https://toidicodedao.com/2017/02/21/tong-quan-micro-service/">https://toidicodedao.com/2017/02/21/tong-quan-micro-service/</a></li>
    </ul>`
}

