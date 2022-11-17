import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SocialIcon } from 'react-social-icons';

export default function Footer() {
    return (
        <footer className="bg-[#151414] text-white py-4 sm:py-12">
            <div className="container mx-auto px-4">
                <div className="sm:flex sm:flex-wrap sm:-mx-4 md:py-4">
                    <div className="px-4 sm:w-1/2 md:w-1/4 md:mt-0">
                        <h5 className="text-xl font-bold w-fit border-b mb-6">موبایل کده</h5>
                        <p className="mb-2 text-justify ">
                            موبایل کده یک فروشگاه اینترنتی با ارائه خدمات در سراسر کشور، اینک در آستانه‌ی آغاز فعالیت، با گستره‌ای از کالاهای متنوع مرتبط با موبایل برای تمام اقشار جامعه و هر رده‌ی سنی، برای کاربران خود «تجربه‌ی لذت‌بخش یک خرید اینترنتی» را تداعی می‌کند.
                        </p>
                    </div>
                    <div className="px-4 sm:w-1/2 md:w-1/4 md:pr-10 xl:pr-20">
                        <h5 className="text-xl font-bold w-fit border-b mb-6">اطلاعات</h5>
                        <ul className="list-none footer-links">
                            <li className="mb-2">
                                <a href="#" className="hover:text-purple-800">درباره ما</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-purple-800">تماس با ما</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-purple-800">قوانین و مقررات</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-purple-800">حریم خصوصی</a>
                            </li>
                        </ul>
                    </div>
                    <div className="px-4 sm:w-1/2 md:w-1/4 mt-8 md:mt-0">
                        <h5 className="text-xl font-bold w-fit border-b mb-6">خدمات مشتریان</h5>
                        <ul className="list-none footer-links">
                            <li className="mb-2">
                                <a href="#" className="hover:text-purple-800">سوالات متداول</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-purple-800">خدمات پس از فروش</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-purple-800">تخفیفات</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-purple-800">فرصت شغلی</a>
                            </li>
                        </ul>
                    </div>
                    <div className="px-4 sm:w-1/2 md:w-1/4 mt-8 md:mt-0">
                        <h5 className="text-xl font-bold w-fit border-b mb-6">تماس  با ما</h5>
                        <ul className="list-none footer-links">
                            <li className="mb-2">
                                <a href="#" className="hover:text-purple-800">09122222222</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-purple-800">تهران- میدان ولیعصر- خیابان...</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-purple-800">0212222222</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-purple-800">example@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                    <div className="px-4 mt-4 w-full text-right sm:text-center">
                        <h5 className="text-xl font-bold mb-6">ما را دنیال کنید</h5>
                        <SocialIcon network="twitter" url="" bgColor="#4e4b4b" />
                        <SocialIcon network="whatsapp" url="" bgColor="#4e4b4b" className="mx-1" />
                        <SocialIcon network="instagram" url="" bgColor="#4e4b4b" />
                        <SocialIcon network="linkedin" url="" bgColor="#4e4b4b" className="mx-1"  />
                        {/* <a href=""><FontAwesomeIcon icon="fa-brands fa-instagram" /></a> */}
                        {/* <a href=""><FontAwesomeIcon icon="fa-brands fa-square-instagram bg-red" /></a> */}
                    </div>
                </div>
                <div className="mt-6 pt-6 border-t text-center">
                    Copyright © 2020. All Rights Reserved.
                </div>
            </div>
        </footer>
    )
}