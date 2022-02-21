import rssLogo from '../../assets/svg/logo-rss.svg';

export const getFooter = (): string => {
  return `
    <div class="footer__container">
      <div class="footer__inner-container">
        <a class="footer__link" href="https://rs.school/js/">
          <img
            class="footer__rss-logo"
            width="60"
            height="60"
            src="${rssLogo}"
            alt="Rolling Scopes School logo"
          />
        </a>
        <div class="footer__links-container">
          <a class="footer__link" href="https://github.com/WeronikaFed">
            <i class="fab fa-github"></i> Вероника
          </a>
          <a class="footer__link" href="https://github.com/v3n9s">
            <i class="fab fa-github"></i> Вениамин
          </a>
          <a class="footer__link" href="https://github.com/khoncharov">
            <i class="fab fa-github"></i> Константин
          </a>
        </div>
        <p class="footer__year">2022</p>
      </div>
    </div>`;
};
