import { TPageComponent } from '../../router';
import { BookParam, HashPath } from '../../types';

export const getSprintPage: TPageComponent = (params) => {
  document.title = 'RSLang - Спринт';

  const appContainer = document.querySelector('#app') as HTMLDivElement;

  const gameNode = document.createElement('section');
  gameNode.className = 'game';

  const { group, page } = params;
  console.log('parse >', group, page);

  if (group === -1) {
    // запускаем с выбора уровня сложности
    console.log('Выбор уровня сложности');
  } else {
    // запускаем с параметрами
    console.log('Игра запушена для G:', group, ', P: ', page);
  }

  gameNode.innerHTML = `
    <button 
      id="audiocall-back-btn" 
      type=button
      style="padding: 10px; cursor: pointer;"
      >| \< Назад к Учебнику |</button>
    <br>
    <br>
    <h2>Спринт</h2>
    <h3>Group = ${group}</h3>
    <h3>Page = ${page}</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sed iusto sequi corporis! Quo
      rem id perspiciatis, possimus quasi cupiditate quod in vero itaque expedita dolor recusandae
      porro consectetur est optio esse numquam nemo tenetur placeat perferendis quis accusantium
      minima? Nulla cumque nesciunt voluptates delectus sit adipisci autem, quos molestiae pariatur
      veniam fugiat quo unde expedita consequuntur odit non excepturi alias optio beatae, dolorum
      natus ut rem eligendi qui. Distinctio magnam earum culpa veniam corporis voluptatem.
      Repudiandae sed reprehenderit repellendus animi cum earum molestias. Nisi, illum cupiditate.
      Earum amet mollitia quod sequi voluptatum tenetur unde maxime minima eum, voluptate ad, eaque
      veniam tempore veritatis autem. Architecto nesciunt minus laborum iste nisi consectetur nulla
      quisquam ducimus, sit sint, animi accusantium ea officia sequi. Sunt autem nihil expedita
      totam fugit. Mollitia ex assumenda aperiam inventore eligendi molestiae, dolores cum odit
      porro esse quisquam provident placeat ipsum magnam culpa est saepe fugit atque cumque vero!
      Nisi ut tempore harum tempora. Temporibus incidunt vitae vel nostrum ducimus voluptates
      aspernatur labore quis, porro officiis, enim laborum deleniti iure iusto omnis consequuntur,
      sint at aliquid pariatur eos vero cum corporis! Praesentium laboriosam libero numquam
      voluptatibus quam non veritatis fuga sunt, culpa placeat a qui, beatae pariatur mollitia
      aliquam harum nisi explicabo doloribus tenetur in alias ipsam illum nemo! Accusamus doloribus
      repellat quae placeat veniam odit, quas numquam distinctio rem voluptate accusantium vero
      eaque officia animi atque at quos omnis dolore illo ipsa veritatis. Magnam recusandae omnis
      ratione possimus animi esse harum quia, quo delectus, exercitationem atque? Modi ullam
      molestiae impedit aperiam, culpa, sit amet esse quas iusto nulla nihil provident alias
      voluptatibus facilis repellat cum laudantium laboriosam tempora dignissimos voluptates?
      Laudantium neque ipsam placeat dolores deleniti quis tempore sunt animi numquam officiis
      recusandae rerum eaque, nihil architecto modi odit deserunt? Eos velit perferendis laudantium.
      Quas nostrum, provident itaque expedita ad cumque, inventore non et impedit neque voluptatem
      odit. Id eius magni iusto dolores, nemo odio maxime excepturi est nobis perspiciatis saepe
      illo iste adipisci ducimus enim eveniet itaque sunt nesciunt praesentium tenetur provident
      natus doloribus alias voluptates. Ratione commodi incidunt ipsa, maxime quos quasi minus
      explicabo quo repellat excepturi atque impedit necessitatibus sit quidem delectus expedita
      dolore rerum illum sequi? Beatae explicabo alias quas sapiente assumenda dolorum magnam sed
      nam vel, harum illum dolores adipisci cupiditate aspernatur error reprehenderit neque vero
      quibusdam officia dolorem in? Itaque voluptatem iste fugiat, impedit alias iure minus, ex eius
      labore repellat voluptates ducimus ut in tempora provident? Dolor deserunt rem veniam ab quia,
      perferendis qui quasi laborum veritatis pariatur sequi provident optio! Eveniet consectetur
      officiis quisquam sunt iure atque numquam sequi ex similique nihil quibusdam dolorem natus
      quod harum accusamus ut, sint laborum deleniti! Laborum, autem aliquid molestias nesciunt eos
      sint culpa enim iste veniam qui ducimus, aperiam, quos nam! Adipisci ut, dolores accusamus in
      quis reiciendis non incidunt odit illo, ex rerum consectetur magni corrupti nesciunt ullam qui
      ad iste. Officia, aut? Maiores tempora doloribus tenetur possimus amet voluptatem non
      excepturi vel, quibusdam accusantium sed. Architecto ex porro id nobis. Esse cumque
      dignissimos necessitatibus consectetur iure mollitia repellat, reiciendis odit quas amet,
      veniam consequatur rem? Nostrum ut sapiente magnam laborum odio est maxime nemo commodi error
      neque quasi hic dolorum molestiae consequatur et voluptate blanditiis quidem aliquam molestias
      praesentium, cupiditate cum. Dolorum laborum inventore fuga fugiat, suscipit iste architecto
      numquam ut alias in quaerat officia eum, reprehenderit ipsa mollitia, dolorem sed! Voluptatem
      blanditiis error libero repudiandae tempora, cupiditate officia praesentium labore, quasi
      facilis modi? Doloremque voluptas minima, sed incidunt laborum reiciendis distinctio modi
      blanditiis exercitationem adipisci, tenetur reprehenderit. Unde, autem quis optio a sit
      eligendi est pariatur doloribus nemo numquam, dolore facilis animi eveniet beatae consequatur
      rerum, commodi blanditiis exercitationem. Necessitatibus culpa atque quidem molestiae ipsam
      nemo, quaerat modi minima iusto esse nisi sint accusantium magni. Alias eveniet ab minima
      quisquam quas voluptatibus at. Dolorum accusamus alias numquam consequatur veniam. Officia
      rerum possimus vel nesciunt magnam laborum sapiente, earum, veritatis expedita neque voluptas
      vitae numquam cumque. Numquam saepe officiis dolor, ex vero nemo consequatur exercitationem
      adipisci esse libero voluptas explicabo nihil earum, distinctio repellendus amet! Inventore
      dolorum molestiae amet rerum distinctio dicta repellendus quis odio sint tempore temporibus
      adipisci ipsam, accusamus error vero numquam, eos aspernatur fugiat repellat harum beatae
      perspiciatis debitis. Rem numquam inventore ea optio cupiditate hic iusto reprehenderit. Qui
      eum, tenetur nemo dolorum obcaecati, ea quod ratione, debitis accusantium maxime possimus iure
      nihil magnam iste quo porro. Quidem asperiores eos, explicabo aspernatur sequi at vitae quod
      ducimus veniam iusto blanditiis, delectus beatae eius unde odio eligendi corrupti vel. Impedit
      inventore omnis voluptas voluptates atque unde cupiditate totam blanditiis iusto, adipisci
      consequuntur, quod distinctio aliquam quidem quia ex, minima provident! Animi, itaque! Libero
      et magnam eligendi, ipsum voluptatibus corrupti esse a tempore saepe, in fuga delectus itaque
      maxime eum quam nemo veniam totam iste nostrum cum maiores. Voluptate eligendi fugiat quia
      magni necessitatibus, reprehenderit corporis sapiente quod quos cumque eius, dignissimos velit
      a. Error similique quos numquam ex cumque sapiente reiciendis nisi harum animi consequatur
      veritatis saepe repudiandae temporibus aliquam doloribus, minima aut natus dicta eligendi
      ducimus ullam asperiores voluptates deleniti iusto. Ut eveniet perspiciatis accusamus placeat,
      quidem distinctio qui ad ipsum autem sunt animi temporibus porro ducimus magnam provident
      fugiat similique dolores minus? Facere perspiciatis rem perferendis mollitia porro
      exercitationem cupiditate beatae veritatis adipisci, iusto assumenda animi fuga, veniam id ut.
      Consequuntur, esse excepturi! Voluptatem placeat quo dolorem odit? Asperiores iusto velit,
      nulla praesentium labore debitis tenetur provident consectetur repellat et a minima animi
      eaque dolores. Impedit, nam. Impedit nulla minima nihil voluptatibus quibusdam porro pariatur
      quasi, illum, praesentium officia hic aut, iste totam non velit eum similique necessitatibus
      dolore accusantium magnam esse ipsa modi quo? Dolores quas blanditiis laborum! Ex dolorem
      suscipit laudantium tempore reiciendis neque, quasi omnis officiis exercitationem fuga
      quisquam consequuntur iste natus dolore. Quaerat unde saepe molestias magnam amet officia
      culpa dignissimos maiores libero veritatis blanditiis dolores ad sed optio eius, doloremque
      voluptatum ex aspernatur quis eaque sint. Ipsam possimus perspiciatis aliquid aperiam officiis
      quaerat, corrupti et, rerum consectetur at velit placeat?
    </p>`;

  const backButton = gameNode.querySelector('#audiocall-back-btn') as HTMLButtonElement;
  backButton.addEventListener('click', () => {
    gameNode.remove();

    const loc = new URL(location.toString());

    if (group === -1) {
      loc.hash = HashPath.bookPage;
    } else {
      loc.hash = `${HashPath.bookPage}?${BookParam.Group}=${group}&${BookParam.Page}=${page}`;
    }

    location.assign(loc);
  });

  appContainer.innerHTML = '';
  appContainer.append(gameNode);
};
